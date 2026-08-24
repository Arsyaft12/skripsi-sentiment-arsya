# ml_model/train.py
"""
Skrip Pelatihan Model AI Toraks (DenseNet121 Transfer Learning)
Berdasarkan Metodologi Preprocessing & CNN Deep Learning.
- Resizing Spasial: 224x224 piksel
- Normalisasi Rescaling: 1/255.0
- Model Architecture: DenseNet121 Backbone + GlobalAveragePooling + Dense Layers
- Output Export: ml_model/thorax_model.h5
"""

import os
import tensorflow as tf
from tensorflow.keras.applications import DenseNet121
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping

# 1. Konfigurasi Parameter & Path
IMG_HEIGHT, IMG_WIDTH = 224, 224
BATCH_SIZE = 32
EPOCHS = 10
DATASET_DIR = os.path.join(os.path.dirname(__file__), "dataset")
MODEL_OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "thorax_model.h5")

def build_model(num_classes=4):
    """Membangun arsitektur DenseNet121 Transfer Learning"""
    base_model = DenseNet121(weights='imagenet', include_top=False, input_shape=(IMG_HEIGHT, IMG_WIDTH, 3))
    
    # Freeze base model layers awal untuk transfer learning
    for layer in base_model.layers[:-20]:
        layer.trainable = False
        
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dropout(0.3)(x)
    x = Dense(128, activation='relu')(x)
    predictions = Dense(num_classes, activation='softmax')(x)
    
    model = Model(inputs=base_model.input, outputs=predictions)
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

def train():
    print("[INFO] Memulai Proses Pelatihan Model AI Toraks...")
    
    if not os.path.exists(DATASET_DIR):
        print(f"[WARN] Folder dataset tidak ditemukan di: {DATASET_DIR}")
        print("Silakan siapkan struktur folder dataset seperti berikut:")
        print("  ml_model/dataset/Cardiomegaly/")
        print("  ml_model/dataset/Effusion/")
        print("  ml_model/dataset/Infiltration/")
        print("  ml_model/dataset/Normal/")
        return

    # 2. Pra-Pemrosesan Citra (Preprocessing & Rescaling 1/255.0)
    datagen = ImageDataGenerator(
        rescale=1./255.0,  # Normalisasi piksel ke skala 0.0 - 1.0
        validation_split=0.2, # 80% Training Set, 20% Validation Set
        rotation_range=10,
        horizontal_flip=True
    )

    train_generator = datagen.flow_from_directory(
        DATASET_DIR,
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='training'
    )

    val_generator = datagen.flow_from_directory(
        DATASET_DIR,
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='validation'
    )

    # 3. Membangun & Melatih Model
    model = build_model(num_classes=train_generator.num_classes)
    model.summary()

    callbacks = [
        ModelCheckpoint(MODEL_OUTPUT_PATH, monitor='val_accuracy', save_best_only=True, verbose=1),
        EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)
    ]

    history = model.fit(
        train_generator,
        epochs=EPOCHS,
        validation_data=val_generator,
        callbacks=callbacks
    )

    print(f"[OK] Pelatihan Selesai! Model terbaik diekspor ke: {MODEL_OUTPUT_PATH}")

if __name__ == "__main__":
    train()