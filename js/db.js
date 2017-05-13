var fdb = new ForerunnerDB();
var db = fdb.db("myDB");

var studentCollection = db.collection('students');

// for (var i = 0; i < 10; i++) {
// 	var newStudent = {
// 		name: "Orange" + i,
// 		age: 10 + i,
// 	}
// 	studentCollection.insert(newStudent);
// }
// studentCollection.save();

studentCollection.load();

function afterload() {
    var students = studentCollection.find();
    console.log(students);
    for (var i = 0; i < students.length; i++) {
    	console.log(students[i]._id);
    	$("#studentsTable").append("<tr><td>"+i+"</td><td>"+students[i].name+"</td></tr>")
    }
}

setTimeout(afterload, 1000);