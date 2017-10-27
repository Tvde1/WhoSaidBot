# from sklearn.feature_extraction.text import TfidfTransformer
from pymongo import MongoClient
client = MongoClient('mongodb://script:script@ds237445.mlab.com:37445/')


x = client['messages'].messages.count()

print(x)

# transformer = TfidfTransformer()
# transformer.fit(X)
