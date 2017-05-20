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
    };
    $("#studentsTable").on("click", ".studentsId", function() {
        var studentId = $(this).text();
        var query = {
            _id: studentId,
        };
        var result = studentCollection.find(query)[0];
        console.log(studentId);
        $("#modal-top").text(result._id);
        $("#inside-name").text(result.name);
        $("#inside-age").text(result.age);
        $("#studentsInfo").modal('show');
    });
}

$("#submit").click(function() {
    var name = $("#name").val();
    var age = $("#age").val();
    var newStudent = {
        name: name,
        age: age,
    }
    studentCollection.insert(newStudent);
    studentCollection.save();
    var students = studentCollection.find(newStudent)[0];
    $("#studentsTable").append("<tr><td class='studentsId'>" + students._id + "</td><td>" + students.name + "</td></tr>")
    $("#name").val("");
    $("#age").val("");
    
})
setTimeout(afterload, 1000);