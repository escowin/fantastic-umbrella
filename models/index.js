// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// 1:M | Cateogry:Product
Category.hasMany(Product, {
  foreignKey: "category_id"
});

Product.belongsTo(Category, {
  foreignKey: "category_id"
});


// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: "product",
  foreignKey: "product_id"
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: "tag",
  foreignKey: "tag_id"

})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
