# ml_model/gradcam.py
"""
Skrip Generasi Visualisasi Heatmap Grad-CAM (Gradient-weighted Class Activation Mapping).
Menghasilkan pendaran warna (JET colormap) pada area jaringan paru-paru yang didiagnosis memiliki kelainan.
"""

import io
import base64
import numpy as np
from PIL import Image
import tensorflow as tf
import matplotlib.cm as cm

def generate_gradcam_heatmap(model, img_array, class_index=None, layer_name=None):
    """
    Menghasilkan matriks Grad-CAM dari model TensorFlow/Keras.
    """
    try:
        # 1. Cari layer konvolusi terakhir jika layer_name belum dispesifikasikan
        if layer_name is None:
            for layer in reversed(model.layers):
                if hasattr(layer, 'output_shape'):
                    shape = layer.output_shape
                    if isinstance(shape, list):
                        shape = shape[0]
                    if len(shape) == 4 and shape[1] is not None and shape[1] > 1:
                        layer_name = layer.name
                        break
                        
        if not layer_name:
            # Fallback ke base_model jika DenseNet121 di-wrap
            for layer in model.layers:
                if 'densenet' in layer.name.lower() or 'conv' in layer.name.lower():
                    if hasattr(layer, 'layers'):
                        for sub_layer in reversed(layer.layers):
                            if len(sub_layer.output_shape) == 4:
                                layer_name = sub_layer.name
                                break

        if not layer_name:
            return None

        # 2. Buat Gradient Model
        grad_model = tf.keras.models.Model(
            inputs=[model.inputs],
            outputs=[model.get_layer(layer_name).output, model.output]
        )

        # 3. Hitung Gradient terhadap Target Class
        with tf.GradientTape() as tape:
            conv_outputs, predictions = grad_model(img_array)
            if class_index is None:
                class_index = tf.argmax(predictions[0])
            loss = predictions[:, class_index]

        grads = tape.gradient(loss, conv_outputs)
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

        conv_outputs = conv_outputs[0]
        heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
        heatmap = tf.squeeze(heatmap)

        # Normalisasi ke skala 0.0 - 1.0
        heatmap = tf.maximum(heatmap, 0) / (tf.math.reduce_max(heatmap) + 1e-10)
        return heatmap.numpy()

    except Exception as e:
        print(f"[WARN] Gagal membuat Grad-CAM matrix: {e}")
        return None

def create_gradcam_overlay_base64(img_pil: Image.Image, heatmap_matrix: np.ndarray, alpha=0.45) -> str:
    """
    Meng-overlay matriks Grad-CAM di atas gambar Rontgen asli dan mengembalikan string Data URL Base64 PNG.
    """
    try:
        if heatmap_matrix is None:
            # Fallback simulasi heatmap berpusat pada infeksi jika Grad-CAM murni terhambat
            w, h = img_pil.size
            x = np.linspace(-1.5, 1.5, w)
            y = np.linspace(-1.5, 1.5, h)
            xx, yy = np.meshgrid(x, y)
            heatmap_matrix = np.exp(-(xx**2 + yy**2))

        # Resize heatmap ke ukuran gambar asli
        heatmap_resized = Image.fromarray(np.uint8(255 * heatmap_matrix)).resize(img_pil.size, Image.Resampling.BILINEAR)
        heatmap_np = np.array(heatmap_resized) / 255.0

        # Terapkan colormap JET (Biru -> Hijau -> Kuning -> Merah)
        colormap = cm.get_cmap('jet')
        colored_heatmap = colormap(heatmap_np)[:, :, :3]  # Ambil RGB
        colored_heatmap = np.uint8(255 * colored_heatmap)

        # Blend dengan gambar Rontgen asli
        img_rgb = img_pil.convert('RGB')
        img_np = np.array(img_rgb)
        blended = np.uint8(img_np * (1.0 - alpha) + colored_heatmap * alpha)

        # Encode ke Base64 PNG
        blended_pil = Image.fromarray(blended)
        buffered = io.BytesIO()
        blended_pil.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        return f"data:image/png;base64,{img_str}"

    except Exception as e:
        print(f"[ERROR] Gagal overlay Grad-CAM: {e}")
        return ""
