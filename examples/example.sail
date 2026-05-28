-- Example SAIL file for testing syntax highlighting and formatting

{
sailComponent: a!formLayout(
label: "Test Form",
items: {
a!textField(
label: "Name",
value: local!name,
saveInto: local!name,
required: true
),
a!buttonLayout(
buttons: {
a!buttonWidget(
label: "Submit",
saveInto: local!submitted
),
a!buttonWidget(
label: "Cancel",
style: "SECONDARY"
)
}
)
}
)
}
