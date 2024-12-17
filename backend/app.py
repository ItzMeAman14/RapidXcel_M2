from flask import Flask,request,jsonify,render_template
from flask_cors import CORS
import sqlite3


app = Flask(__name__)
CORS(app)

DATABASE = "RapidXcel.db"

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    db = get_db()
    db.execute('''
        CREATE TABLE IF NOT EXISTS stocks (
            stock_id INTEGER PRIMARY KEY,
            stock_name TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            weight REAL NOT NULL
        )
    ''')
    
    db.commit()
    print("Database and Table is Created")

# Route for fetching all Stocks
@app.route('/getStocks')
def get_stocks():
    try:
        db = get_db()
        cur = db.execute('SELECT * FROM stocks')
        data = cur.fetchall()

        stocks = []
        for row in data:
            stock = {
                'stock_id': row[0],
                'stock_name': row[1],
                'price': row[2],
                'quantity': row[3],
                'weight': row[4]
            }
            stocks.append(stock)
        return jsonify(stocks)
    except sqlite3.Error:
        return jsonify({"danger":"Some Error Occured"})

# Route to add a new Stock
@app.route('/addStock', methods=['POST'])
def add_task():
    try:
        data = request.get_json()

        stock_name = data["name"]
        stock_price = data["price"]
        stock_quan = data["quantity"]
        stock_weight = data["weight"]

        db = get_db()
        db.execute('INSERT INTO stocks (stock_name,price,quantity,weight) VALUES (?,?,?,?)', (stock_name,stock_price,stock_quan,stock_weight))
        db.commit()
        return jsonify({"success":"Stock is Added Successfully"})
    except sqlite3.Error:
        return jsonify({"danger":"Some Error Occured"})
    
    
<<<<<<< HEAD
# Route to delete Stock using ID
=======
>>>>>>> c0d51336463e263fde6d3a47c2c60481d84c5bd4
@app.route('/deleteStock', methods=['POST'])
def delete_stock():
    try:
        data = request.get_json()
        idToDelete = data["id"]
        db = get_db()
        db.execute(f'DELETE FROM stocks WHERE stock_id={idToDelete}')
        db.commit()
        return jsonify({"success":"Stock Deleted Successfully"})
    except sqlite3.Error:
        return jsonify({"danger":"Some Error Occured"})

# Route to update Stock using ID
@app.route('/updateStock',methods=["POST"])
def update_stock():
    try:
        data = request.get_json()
        idtToUpdate = data["id"]
        name = "" if not "name" in data else data["name"]
        price = data["price"]
        quantity = data["quantity"]
        weight = data["weight"]
        
        if not name:
            return jsonify({"danger":"Name not Provided"})
        
        db = get_db()
        db.execute('''
            UPDATE stocks
            SET price = ?, quantity = ?, stock_name = ?, weight = ?
            WHERE stock_id = ?
        ''', (price, quantity,name,weight,idtToUpdate))
        db.commit()
        
        return jsonify({"success":"Stock Updated Successfully"})        
    except sqlite3.Error as e:
        print(e)
        return jsonify({"danger":"Some Error Occured"})
          

@app.route('/updateStock',methods=["POST"])
def update_stock():
    try:
        data = request.get_json()
        idtToUpdate = data["id"]
        name = "" if not "name" in data else data["name"]
        price = data["price"]
        quantity = data["quantity"]
        
        if not name:
            return jsonify({"danger":"Name not Provided"})
        
        db = get_db()
        db.execute('''
            UPDATE stocks
            SET price = ?, quantity = ?, stock_name = ?
            WHERE stock_id = ?
        ''', (price, quantity,name, idtToUpdate))
        db.commit()
        
        return jsonify({"success":"Stock Updated Successfully"})        
    except sqlite3.Error as e:
        print(e)
        return jsonify({"danger":"Some Error Occured"})
          

@app.route("/")
def home():
    return render_template('test.html')

# Run the app
if __name__ == '__main__':
    init_db()
    app.run(debug=True)