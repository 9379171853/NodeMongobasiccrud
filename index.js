const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('Connected to mongodb..'))
    .catch(err=> console.error('Could not connect the db..',err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type : Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});


const Course = mongoose.model("Course",courseSchema);

async function creatCourse(){
    const course = new Course({
        name: 'Reactjs Course',
        author: 'singh',
        tags: ['React','Frontend'],
        isPublished: true,
        price: 15
    });
    
    const result = await course.save();
    console.log(result);
}
//creatCourse();
async function findAllCourses(){

    const pageNumber =2;
    const pageSize =10;
    const result=  await Course
    .find({author:'kumar', isPublished: true}) 
    .skip((pageNumber -1) *pageSize)
    .limit(pageSize)
    .sort({name: 1})
    .select({name: 1 , tags: 1});
    // await Course.find({author:'singh' })
    //.count();
    console.log(result);
}

//findAllCourses();


async function updateCourse(id){
 
    //Query first approach
    // const course = await Course.findById(id);
    // if(!course) return;

    // course.isPublished = true;
    // course.author= 'Another Author';

    // const result= await course.save();
    // console.log(result);

    //update first approach
    // const result = await Course.update({_id: id},{
    //     $set:{
    //         author: 'amrendra',
    //         isPublished: false
    //     }
    // })
    // console.log(result);

    //3rd approch
    const course = await Course.findByIdAndUpdate(id , {
        $set:{
            author: 'shivam',
            isPublished: 'false'
        }
    }, {new: true});

    console.log(course);
   
}

//updateCourse('5cb743a975e2010da8614bb9')


async function remveCourse(id){
    //first approch..
    //const result = await Course.deleteOne({_id: id});
    //second approach
   // const result = await Course.deleteMany({_id: id});
    

    //third approach

    const result = await Course.findByIdAndRemove({_id: id});

    console.log(result);
}

remveCourse('5cb743a975e2010da8614bb9');





