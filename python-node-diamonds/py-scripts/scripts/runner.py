import argparse
import pandas as pd
import numpy as np
import joblib
import json
from sklearn import preprocessing
from sklearn.utils import column_or_1d

parser = argparse.ArgumentParser("pservice")
parser.add_argument("data", help="Json string with diamond(s) features to compute price", type=str)
args = parser.parse_args()

class MyLabelEncoder(preprocessing.LabelEncoder):
    def fit(self, y):
        y = column_or_1d(y, warn=True)
        self.classes_ = pd.Series(y).unique()
        return self

cuts = ['Fair', 'Good', 'Ideal', 'Premium', 'Very Good']
colors = ['D', 'E', 'F', 'G', 'H', 'I', 'J']
clarities = ['I1', 'SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF']

data = pd.read_json(args.data)

to_encode_column = ['cut', 'color', 'clarity']
to_encode_names = [cuts, colors, clarities]

for idx, c in enumerate(to_encode_column):
    le = MyLabelEncoder()
    le.fit(to_encode_names[idx])
    data[c] = le.transform(data[c])

data = data.drop(columns=['x', 'z', 'table'])

model = joblib.load("/app/py-scripts/models/randomForest.sav")

results = model.predict(data)

print(json.dumps(np.ndarray.tolist(results)))
