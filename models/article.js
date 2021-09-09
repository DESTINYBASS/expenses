const mongoose = require("mongoose");
const slugify = require("slugify")

const articleSchema = new mongoose.Schema({
        amount: {
            type: Number,
            required: true
        },
        place :{
            type: String,
            required: true
        },
        category: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now,
            unique: true
        },
        slug: {

        }
})

articleSchema.pre("validate", function(next){
    if (this.amount){
        this.slug = slugify(this.amount + " " + this.date, { lower: true, strict: true})
    }
    next()
});


module.exports = mongoose.model("Article", articleSchema);