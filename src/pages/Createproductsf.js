import {

   Button,
   Form,
   Upload,
   Input
 } from "antd";
 
 
 
 const formItemLayout = {
   labelCol: {
     xs: {
       span: 24,
     },
     sm: {
       span: 8,
     },
   },
   wrRegistererCol: {
     xs: {
       span: 24,
     },
     sm: {
       span: 16,
     },
   },
 };
 const tailFormItemLayout = {
   wrRegistererCol: {
     xs: {
       span: 24,
       offset: 0,
     },
     sm: {
       span: 16,
       offset: 8,
     },
   },
 };
 const Createproductsf = () => {
   const [form] = Form.useForm();

   async function addProduct(value) {
     console.log(value,"value");
     try {
       const response = await fetch("http://localhost:5000/createproduct", {
         method: 'POST',
         body: value,
         headers: {
           "Authorization": localStorage.getItem("token"),
           "Content-Type": "multipart/form-data",
           "Accept": "application/json",
           "type": "formData"
         },
       });
   
       const data = await response.json();
       if (data.message === "Created") {
          const successMessage = document.getElementById("success-message");
       successMessage.textContent = "Product created successfully!";
       }
     } catch (error) {
       console.log("An error occurred while creating the product:", error);
     }
   }
    const handleFileUpload = (fileList) => {
    form.setFieldsValue({ image: fileList });
  };
   
   

   return (
     <div  className="registerCont">
       <div className="registerChild">
     <Form
     id="success-message"
       {...formItemLayout}
       form={form}
       name="register"
       onFinish={addProduct}
       initialValues={{
         residence: ["zhejiang", "hangzhou", "xihu"],
         prefix: "86",
       }}
       style={{
         maxWidth: 600,
       }}
       scrollToFirstError
     >
       <h1>Add Product</h1>
     <Form.Item
         name="name"
         label="name"
         tooltip="What is your products name?"
         rules={[
           {
             required: true,
             message: "Please input your product name!",
             whitespace: true,
           },
         ]}
       >
         <Input/>
       </Form.Item>
 
       
       <Form.Item 
         name="image"
         label="image"
         rules={[
          
           {
             required: false,
             message: "Please input your image URL !",
             whitespace: true,
           },
         ]}
       >
  
          <Input type="file"/> 
       </Form.Item>   
  
       <Form.Item
         name="description"
         label="descripton"
         rules={[
           {
             required: true,
             message: "Please input product's descripton",
             whitespace: true,
           },
         ]}
       >
         <Input />
       </Form.Item>



       <Form.Item
         name="price"
         label="price"
         rules={[
           {
             required: true,
             message: "Please input your product's price!",
             whitespace: true,
           },
         ]}
       >
         <Input />
       </Form.Item>
 
       <Form.Item
         name="categoryId"
         label="Category ID"
         rules={[
           {
             required: true,
             message: "Please input your Category ID !",
             whitespace: true,
           },
         ]}
       >
         <Input />
       </Form.Item>
 
       
       
       <Form.Item {...tailFormItemLayout}>
         <Button type="primary" htmlType="submit">
           Add Product
         </Button>
       </Form.Item>
     </Form>
     </div>
   </div>
   );
 };
 export default Createproductsf;