import pandas as pd
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
from rdkit import Chem
from rdkit.Chem import AllChem

import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.metrics import mean_squared_error, mean_absolute_error
from scipy.stats import pearsonr
from sklearn.metrics import r2_score

def run_model(model, df_upload):

    user_df = pd.read_csv(df_upload)

    #Remove unneccesary cols
    # to_drop = ['Unnamed: 0']
    # user_df.drop(to_drop, inplace=True, axis=1)

    arr = []

    # Generate Morgan fingerprints for each compound and store them in arr list
    for i in range(len(user_df)):
        
        # Define the SMILES string for drug
        smiles = user_df['isosmiles'][i]
        
        # Generate Rockit molecule object from SMILES
        mol = Chem.MolFromSmiles(smiles)
        
        # Generate Morgan fingerprint with radius 2 and 256 bits
        fp = AllChem.GetMorganFingerprintAsBitVect(mol, radius=2, nBits =256)
        
        # Convert fingerprint to a numpy array
        fp_array = np.zeros((1,), dtype = np.int64)
        
        # Display the hashed count Morgan fingerprint
        AllChem.DataStructs.ConvertToNumpyArray(fp, fp_array)
        arr.append(fp_array)

    morgan_data =pd.DataFrame(arr)


    # Join morgan_data DataFrame with user_df 
    user_df_morgan = user_df.join(morgan_data)

    # Drop column 'isosmiles' from user_df_morgan
    to_drop = ['isosmiles']
    user_df_morgan.drop(to_drop, inplace=True, axis=1)

    # from user upload data
    X_test = user_df_morgan.drop(columns=['DRUG_NAME', 'CELL_LINE_NAME', 'DRUG_ID', 'COSMIC_ID'])

    X_test.columns = X_test.columns.astype(str)

    # Standardize features by removing the mean and scaling to unit variance
    scaler = StandardScaler()
    X_test_scaled = scaler.fit_transform(X_test)

    model = tf.keras.models.load_model(model)

    # Predict on the test set
    y_pred = model.predict(X_test_scaled)

    # Create a DataFrame with the required columns
    prediction_df = pd.DataFrame({
        'COSMIC_ID': user_df_morgan.loc[X_test.index, 'COSMIC_ID'],
        'CELL_LINE_NAME': user_df_morgan.loc[X_test.index, 'CELL_LINE_NAME'],
        'DRUG_ID': user_df_morgan.loc[X_test.index, 'DRUG_ID'],  # Retrieve 'DRUG_ID' using the index of the original DataFrame
        'DRUG_NAME': user_df_morgan.loc[X_test.index, 'DRUG_NAME'],
        'PRED_LN_IC50': y_pred.flatten()  # Flatten the y_pred array to make it one-dimensional
    })

    prediction_df['Resistance_Cut-Off'] = prediction_df['PRED_LN_IC50'].apply(lambda x: 'High' if x > 3.77 else 'Low')

    # Reset the index of the prediction DataFrame
    prediction_df.reset_index(drop=True, inplace=True)

    print(prediction_df)

    return prediction_df


if __name__ == '__main__':
    run_model("C:/Users/Ali Azhar/Documents/DRUGRESFINAL/MDS6_FIT3164/Predictive Model Web Application/src/uploads/PREDICTION.h5", "C:/Users/Ali Azhar/Documents/DRUGRESFINAL/MDS6_FIT3164/Predictive Model Web Application/src/uploads/sample_user_upload_data.csv")

# import pandas as pd

# from rdkit import Chem
# from rdkit.Chem import AllChem

# import numpy as np
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import StandardScaler
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense
# from tensorflow.keras.callbacks import EarlyStopping
# from sklearn.metrics import mean_squared_error, mean_absolute_error
# from scipy.stats import pearsonr
# from sklearn.metrics import r2_score

# def run_model(df_permanent, df_upload):



#     df = pd.read_csv(df_permanent)


#     # for web development, the filename might need to be changed
#     # because the user might not upload the same file name
#     # you should have the function to read the filename that the user upload and pass into here
#     user_df = pd.read_csv(df_upload)

#     #Remove unneccesary cols
#     to_drop = ['Unnamed: 0']
#     # user_df.drop(to_drop, inplace=True, axis=1)

#     arr = []

#     # Generate Morgan fingerprints for each compound and store them in arr list
#     for i in range(len(user_df)):
        
#         # Define the SMILES string for drug
#         smiles = user_df['isosmiles'][i]
        
#         # Generate Rockit molecule object from SMILES
#         mol = Chem.MolFromSmiles(smiles)
        
#         # Generate Morgan fingerprint with radius 2 and 256 bits
#         fp = AllChem.GetMorganFingerprintAsBitVect(mol, radius=2, nBits =256)
        
#         # Convert fingerprint to a numpy array
#         fp_array = np.zeros((1,), dtype = np.int64)
        
#         # Display the hashed count Morgan fingerprint
#         AllChem.DataStructs.ConvertToNumpyArray(fp, fp_array)
#         arr.append(fp_array)

#     morgan_data =pd.DataFrame(arr)


#     # Join morgan_data DataFrame with user_df 
#     user_df_morgan = user_df.join(morgan_data)

#     # Drop column 'isosmiles' from user_df_morgan
#     to_drop = ['isosmiles']
#     user_df_morgan.drop(to_drop, inplace=True, axis=1)

#     # Split data into features (X) and target variable (y)
#     X = df.drop(columns=['DRUG_NAME', 'CCLE_Name', 'DRUG_ID', 'COSMIC_ID', 'LN_IC50'])
#     y = df['LN_IC50']

#     # from default drug-breat-cancer dataset
#     # Split the data into training and validation sets
#     X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

#     # from user upload data
#     X_test = user_df_morgan.drop(columns=['DRUG_NAME', 'CELL_LINE_NAME', 'DRUG_ID', 'COSMIC_ID'])

#     X_test.columns = X_test.columns.astype(str)

#     # Standardize features by removing the mean and scaling to unit variance
#     scaler = StandardScaler()
#     X_train_scaled = scaler.fit_transform(X_train)
#     X_val_scaled = scaler.transform(X_val)
#     X_test_scaled = scaler.transform(X_test)


#     # Build the deep learning model using the best parameters
#     model = Sequential()
#     model.add(Dense(64, activation='relu', input_shape=(X_train.shape[1],)))
#     model.add(Dense(128, activation='relu'))
#     model.add(Dense(1))

#     # Compile the model
#     model.compile(optimizer='adam', loss='mean_squared_error')

#     # Early stopping
#     early_stopping = EarlyStopping(monitor='val_loss', patience=15, restore_best_weights=True)

#     # Train the model with early stopping
#     for _ in range(4):
#         history = model.fit(X_train_scaled, y_train, epochs=100, batch_size=32, validation_data=(X_val, y_val), callbacks=[early_stopping], verbose=1)


#     # Predict on the test set
#     y_pred = model.predict(X_test_scaled)

#     # Create a DataFrame with the required columns
#     prediction_df = pd.DataFrame({
#         'DRUG_ID': user_df_morgan.loc[X_test.index, 'DRUG_ID'],  # Retrieve 'DRUG_ID' using the index of the original DataFrame
#         'DRUG_NAME': user_df_morgan.loc[X_test.index, 'DRUG_NAME'],
#         'COSMIC_ID': user_df_morgan.loc[X_test.index, 'COSMIC_ID'],
#         'CELL_LINE_NAME': user_df_morgan.loc[X_test.index, 'CELL_LINE_NAME'],
#         'PRED_LN_IC50': y_pred.flatten()  # Flatten the y_pred array to make it one-dimensional
#     })

#     # Reset the index of the prediction DataFrame
#     prediction_df.reset_index(drop=True, inplace=True)

#     return prediction_df.to_csv('user_prediction_result.csv')

