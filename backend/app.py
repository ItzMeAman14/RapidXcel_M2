from flask import Flask,request,jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///RapidXcel.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

db = SQLAlchemy(app)
class Stock(db.Model):
    __tablename__ = 'stocks'

    stock_id = db.Column(db.Integer, primary_key=True)
    stock_name = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"<Stock {self.stock_name}>"

# Route for fetching all Stocks
@app.route('/getStocks')
def get_stocks():
    try:
        stocks = Stock.query.all()
        stocks_list = [{"stock_id": stock.stock_id, "stock_name": stock.stock_name, "price": stock.price, "quantity": stock.quantity, "weight": stock.weight} for stock in stocks]
        return jsonify(stocks_list)
    except Exception:
        return jsonify({"danger":"Some Error Occured"})


# Route to add a new Stock
@app.route('/addStock', methods=['POST'])
def add_stock():
    try:
        data = request.get_json()

        new_stock = Stock(
            stock_name = data["name"],
            price = data["price"],
            quantity = data["quantity"],
            weight = data["weight"]
        )

        db.session.add(new_stock)
        db.session.commit()

        return jsonify({"success":"Stock is Added Successfully"})
    
    except Exception:
        return jsonify({"danger":"Some Error Occured"})
    
    
# Route to delete Stock using ID
@app.route('/deleteStock', methods=['DELETE'])
def delete_stock():
    try:
        data = request.get_json()
        idToDelete = data["id"]
        stock = Stock.query.get(idToDelete)

        if not stock:
            return jsonify({"danger":"Stock not Found"}), 404

        db.session.delete(stock)
        db.session.commit()
        
        return jsonify({"success":"Stock Deleted Successfully"})
    except Exception:
        return jsonify({"danger":"Some Error Occured"})

# Route to update Stock using ID
@app.route('/updateStock',methods=["PUT"])
def update_stock():
    try:
        data = request.get_json()
        idToUpdate = data["id"]
        
        stock = Stock.query.get(idToUpdate)

        if not stock:
            return jsonify({"danger": "Stock not found"}), 404

        stock.stock_name = data["name"]
        stock.price = data["price"]
        stock.quantity = data["quantity"]
        stock.weight = data["weight"]
        
        db.session.commit()

        return jsonify({"success":"Stock Updated Successfully"})        
    except Exception:
        return jsonify({"danger":"Some Error Occured"})
          
@app.route("/getStock/<id>")
def get_stock_by_id(id):
    try:
        stock = Stock.query.get(id)
        return jsonify([{"stock_id": stock.stock_id, "stock_name": stock.stock_name, "price": stock.price, "quantity": stock.quantity, "weight": stock.weight}])
        
    
    except Exception as e:
        print(e)
        return jsonify({"danger":"Some Error Occured"})
    

# Run the app
if __name__ == '__main__':
    app.run(debug=True)