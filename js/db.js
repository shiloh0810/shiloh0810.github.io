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

function createHTMLString(_id, name) {
    return "<tr><td class='studentsId'>" + _id + "</td><td>" + name + "</td><td><button class='updateButton btn btn-warning' data-id='" + _id + "'>修改</button> <button class='deleteButton btn btn-primary' data-id='" + _id + "' >刪除</button></td></tr>";
}

function afterload() {
    var students = studentCollection.find();
    console.log(students);
    for (var i = 0; i < students.length; i++) {
        $("#studentsTable").append(createHTMLString(students[i]._id, students[i].name))
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
    $("#studentsTable").append(createHTMLString(students._id, students.name));
    $("#name").val("");
    $("#age").val("");

})

function deleteData() {
    var r = confirm("Are you sure you want to delete?");
    if (r) {
        var id = $(this).attr("data-id");
        studentCollection.remove({
            _id: id,
        })
        studentCollection.save();
        $(this).parents("tr").remove();
    }
}

function updateData() {
    var studentId = $(this).attr("data-id");
    var query = {
        _id: studentId,
    };
    var result = studentCollection.find(query)[0];
    $("#updateName").val(result.name);
    $("#updateAge").val(result.age);
    $("#updateModal").modal('show');

    $("#save").attr("data-id", studentId);
}

$("#studentsTable").on("click", ".deleteButton", deleteData);
$("#studentsTable").on("click", ".updateButton", updateData);
$("#save").click(function() {
    var studentId = $(this).attr("data-id");
    var name = $("#updateName").val();
    var age = $("#updateAge").val();
    var newStudent = {
        name: name,
        age: age,
    }
    $("#updateModal").modal('hide');
    studentCollection.updateById(studentId, newStudent);
    console.log(studentId)
    studentCollection.save();
})
setTimeout(afterload, 1000);