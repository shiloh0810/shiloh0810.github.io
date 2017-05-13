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
        $("#studentsTable").append("<tr><td class='studentsId'>" + students[i]._id + "</td><td>" + students[i].name + "</td></tr>")
    }
    $(".studentsId").click(function() {
        var studentId = $(this).text();
        var query = {
            _id: studentId
        };
        var result = studentCollection.find(query)[0];
        $("#modal-top").text(result._id);
        $("#inside-name").text(result.name);
        $("#inside-age").text(result.age);
        $("#studentsInfo").modal('show');
    })
}

setTimeout(afterload, 1000);