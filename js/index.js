function hello() {
    var Name = $("#Name").val();
    var Age = $("#Age").val();
    var like = "";
    if ($("#one-checkbox").prop("checked")) {
        like += " " + $("#one-checkbox").val();
    }
    if ($("#two-checkbox").prop("checked")) {
        like += " " + $("#two-checkbox").val();
    }
    if ($("#three-checkbox").prop("checked")) {
        like += " " + $("#three-checkbox").val();
    }
    alert("Hello, " + Age + "-year-old " + Name + ". You like" + like + " sandwich!");
    $("#Name").val("");
    $("#Age").val("");
    $("#one-checkbox").prop("checked", false);
    $("#two-checkbox").prop("checked", false);
    $("#three-checkbox").prop("checked", false);
}
$("#btn").on("click", hello);