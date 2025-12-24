---
title: 'Understanding and Utilizing Connections & Variables in Dataflow'
description: 'This guide will walk you through the step-by-step process of adding, editing, and testing connections and variables in Dataflow'
tags: ['connections', 'dataflow', 'variables']
date: '30 Jan, 2025'
image: /assets/images/blogs/connection-variable/connections-blog-thumbnail.jpg
blog_no: 3
---


In **Dataflow**, managing **connections** and **variables** efficiently is crucial for a seamless data science workflow. Whether you're connecting to a database or defining reusable variables, our platform makes it easy to set up and use them across your projects.  

This guide will walk you through the **step-by-step process** of adding, editing, and testing **connections** and **variables** in Dataflow.  

---

## **What Are Connections and Variables?**  

### **Connections**  
A **connection** in Dataflow allows you to securely link to various databases such as **PostgreSQL, MySQL**, and more. These connections enable you to retrieve and manipulate data directly within your workflows.  

### **Variables**  
A **variable** is a reusable value that can be used anywhere in your Dataflow projects such as **API keys**, **access tokens** or **credentials**.  

This guide will walk you through how to **create, update, test, and delete** both **connections** and **variables** step by step.  

---
## **Managing Connections**  

### **1️⃣ Creating a Connection**  
1. Go to the **Connections** section from the sidebar and click **"Add Connection"**.   
3. Choose the **database type** (e.g., PostgreSQL, MySQL, etc.).  
4. Fill in the required fields:  
   - **Connection Name** (must be unique)  
   - **Database Type**  
   - **Host**  
   - **Port** 
   - **Login** (username)
   - **Password**  
   - **Extra settings (if required, such as SSL options)**  
5. Click **"Save"** to create the connection.  

![Alt text](/assets/images/blogs/connection-variable/create_connection.png)

---

### **2️⃣ Updating a Connection**  
1. Go to the **Connections** page.  
2. Click **Edit** next to the connection you want to modify.  
3. Update the necessary details.  
4. Click **"Save"** to apply changes.  

> ✅ **Pro Tip:** Updating a connection does not affect existing workflows unless credentials change.  

---

### **3️⃣ Testing a Connection**  
- Click the **"Test Connection"** button.  
- The system will check the credentials and return if the **connection is valid or not**.  

  ![Alt text](/assets/images/blogs/connection-variable/test_connection.png)

---

### **4️⃣ Deleting a Connection**  
- Click the **"Delete"** button next to a connection.  
- Confirm the action (⚠️ This cannot be undone).  

> ✅ **Note:** Once deleted, any workflows using this connection will **fail** until a new connection is configured with the same connection name.  

---

## **Managing Variables**  

### **1️⃣ Creating a Variable**  
1. Go to the **Settings** section from the sidebar and click **"Variables"**. 
2. Click **"Add Variable"**.  
3. Enter:  
   - **Key** (must be unique)  
   - **Value** (String, Integer, Boolean, etc.)  
   - **Description** (optional)  
4. Click **"Save"**.  

![Alt text](/assets/images/blogs/connection-variable/create_variable.png)

---

### **2️⃣ Updating a Variable**  
1. Go to the **Variables** page.  
2. Click **Edit** next to the variable.  
3. Modify its value and click **"Save"**.  


---

### **3️⃣ Deleting a Variable**  
- Click **"Delete"** next to the variable.  
- Confirm the deletion (⚠️ This will impact workflows using this variable).  

> ✅ **Note:** Ensure that no active workflows depend on the variable before deleting it.  

---
# 📌 Using Connections and Variables in Python Code

Once you’ve created connections and variables in Dataflow, you can use them directly in your Python scripts to interact with databases or retrieve stored values.

---

##  1. Using a Connection in Python

You can retrieve a database connection using the **Dataflow SDK** and execute queries without hardcoding credentials.

### **Example: Connecting to a Database & Running a Query**
```python
from dataflow.dataflow import Dataflow 
from sqlalchemy import text 

# Initialize Dataflow SDK 
dataflow = Dataflow() 

# Retrieve the connection by specifying the connection ID 
db = dataflow.connection("conn_id") 

# Execute a simple SQL query 
result = db.execute(text("SELECT 1")) 

# Fetch the first row 
row = result.fetchone() print(row)
```

### What This Does:
✔ Fetches the database connection using the connection ID (`conn_id`).  
✔ Executes a SQL query (`SELECT 1`).  
✔ Retrieves and prints the result.

💡 **Make sure the connection ID matches the one you created in Dataflow!**

---

##  2. Using a Variable in Python

Variables in Dataflow can store **reusable values** such as **API keys, thresholds, or dynamic parameters**. You can fetch these variables in Python like this:

### **Example: Retrieving a Variable in Python**
```python
from dataflow.dataflow import Dataflow 
from sqlalchemy import text 

# Initialize Dataflow SDK 
dataflow = Dataflow() 

# Retrieve a variable by specifying its name
variable_value = dataflow.variable("variable_name")

# Print the variable's value 
print(variable_value)
```

### What This Does:
✔ Fetches the variable value using its name (`variable_name`).  
✔ Prints the retrieved value.

💡 **Make sure the variable name matches the one you created in Dataflow!**

---

## 💭 Final Thoughts

Now that you know how to:
- **Create, update, and delete** connections & variables  
- **Use them in Python scripts** for database access & dynamic values  

You can start integrating them into your **Dataflow projects** to build flexible and scalable workflows! 🎯  

---

## 💡 Next Steps:

- Try **executing a real SQL query** using a database connection.  
- Use variables to store **API keys, parameters, or configurations** dynamically.  
- Experiment with **different database types** like **MySQL,  PostgreSQL**.



