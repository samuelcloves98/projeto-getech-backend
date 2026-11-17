const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = sequelize.define('User', {
  firstname:{type:DataTypes.STRING,allowNull:false}, surname:{type:DataTypes.STRING,allowNull:false},
  email:{type:DataTypes.STRING,allowNull:false,unique:true,validate:{isEmail:true}}, password:{type:DataTypes.STRING,allowNull:false}
},{tableName:'users',timestamps:true,underscored:true,defaultScope:{attributes:{exclude:['password']}} ,scopes:{withPassword:{attributes:{}}}});
const Category = sequelize.define('Category',{name:{type:DataTypes.STRING,allowNull:false},slug:{type:DataTypes.STRING,allowNull:false},use_in_menu:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}},{tableName:'categories',timestamps:true,underscored:true});
const Product = sequelize.define('Product',{
 enabled:{type:DataTypes.BOOLEAN,defaultValue:false},name:{type:DataTypes.STRING,allowNull:false},slug:{type:DataTypes.STRING,allowNull:false},
 use_in_menu:{type:DataTypes.BOOLEAN,defaultValue:false},stock:{type:DataTypes.INTEGER,defaultValue:0},description:{type:DataTypes.STRING},
 price:{type:DataTypes.FLOAT,allowNull:false},price_with_discount:{type:DataTypes.FLOAT,allowNull:false}
},{tableName:'products',timestamps:true,underscored:true});
const ProductImage=sequelize.define('ProductImage',{enabled:{type:DataTypes.BOOLEAN,defaultValue:false},path:{type:DataTypes.STRING,allowNull:false}},{tableName:'product_images',timestamps:true,underscored:true});
const ProductOption=sequelize.define('ProductOption',{
 title:{type:DataTypes.STRING,allowNull:false},shape:{type:DataTypes.ENUM('square','circle'),defaultValue:'square'},radius:{type:DataTypes.INTEGER,defaultValue:0},
 type:{type:DataTypes.ENUM('text','color'),defaultValue:'text'},values:{type:DataTypes.STRING,allowNull:false}
},{tableName:'product_options',timestamps:true,underscored:true});
const ProductCategory=sequelize.define('ProductCategory',{}, {tableName:'products_categories',timestamps:false,underscored:true});
Product.hasMany(ProductImage,{as:'images',foreignKey:'product_id',onDelete:'CASCADE'}); ProductImage.belongsTo(Product,{foreignKey:'product_id'});
Product.hasMany(ProductOption,{as:'options',foreignKey:'product_id',onDelete:'CASCADE'}); ProductOption.belongsTo(Product,{foreignKey:'product_id'});
Product.belongsToMany(Category,{through:ProductCategory,as:'categories',foreignKey:'product_id',otherKey:'category_id'});
Category.belongsToMany(Product,{through:ProductCategory,as:'products',foreignKey:'category_id',otherKey:'product_id'});
module.exports={sequelize,User,Category,Product,ProductImage,ProductOption,ProductCategory};
