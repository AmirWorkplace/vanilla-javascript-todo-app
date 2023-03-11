function serializeArray(form) {
  let serializedArray = []

  for (let i = 0; i < form.elements.length; i++) {
    let field = form.elements[i]
    if (
      field.name &&
      !field.disabled &&
      ["file", "reset", "submit", "button"].indexOf(field.type) === -1
    ) {
      if (field.type === "select-multiple") {
        for (let j = 0; j < field.options.length; j++) {
          if (field.options[j].selected) {
            serializedArray.push({
              name: field.name,
              value: field.options[j].value,
            })
          }
        }
      } else if (
        (field.type !== "checkbox" && field.type !== "radio") ||
        field.checked
      ) {
        serializedArray.push({
          name: field.name,
          value: field.value,
        })
      }
    }
  }
  return serializedArray
}

/*
 !NEW
 */

function serializeArray(form) {
  let initialFormData = []
  const inputFields = [
    "file",
    "reset",
    "submit",
    "text",
    "checkbox",
    "radio",
    "email",
    "password",
    "range",
  ]

  for (var i = 0; i < form.elements.length; i++) {
    let field = form.elements[i]

    if (
      field.name &&
      !field.disabled &&
      inputFields.indexOf(field.type) === -1
    ) {
      if (field.type === "select-multiple") {
        for (var j = 0; j < field.options.length; j++) {
          if (field.options[j].selected) {
            initialFormData.push({
              name: field.name,
              value: field.options[j].value,
            })
          }
        }
      }
    } else {
      if (field.type !== "checkbox" && field.type !== "radio") {
        initialFormData.push({
          name: field.name,
          value: field.value,
        })
      } else {
        initialFormData.push({
          name: field.name,
          checked: field.checked,
        })
      }
    }
  }

  return initialFormData
}
// console.log(serializeArray(todoForm))
// console.log(serializeArray(todoForm))

const formData = (formElement) => {
  function serializeArray(form) {
    let initialFormData = []
    const inputFields = [
      "file",
      "reset",
      "submit",
      "text",
      "checkbox",
      "radio",
      "email",
      "password",
      "range",
    ]

    for (var i = 0; i < form.elements.length; i++) {
      let field = form.elements[i]

      if (
        field.name &&
        !field.disabled &&
        inputFields.indexOf(field.type) === -1
      ) {
        if (field.type === "select-multiple") {
          for (var j = 0; j < field.options.length; j++) {
            if (field.options[j].selected) {
              initialFormData.push({
                name: field.name,
                value: field.options[j].value,
              })
            }
          }
        }
      } else {
        if (field.type !== "checkbox" && field.type !== "radio") {
          initialFormData.push({
            name: field.name,
            value: field.value,
          })
        } else {
          initialFormData.push({
            name: field.name,
            checked: field.checked,
          })
        }
      }
    }

    return initialFormData
  }

  return serializeArray(formElement).reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.name]: currentValue.value,
    }),
    {}
  )
}
/* 
    !NEW End
    !NEW Start
*/

const serializeFormData = (formElement) => {
  function serializeArray(form) {
    let initialFormData = []
    const inputFields = [
      "file",
      "reset",
      "submit",
      "text",
      "checkbox",
      "radio",
      "email",
      "password",
      "range",
    ]

    for (var i = 0; i < form.elements.length; i++) {
      let field = form.elements[i]

      if (
        field.name &&
        !field.disabled &&
        inputFields.indexOf(field.type) === -1
      ) {
        if (field.type === "select-multiple") {
          for (var j = 0; j < field.options.length; j++) {
            if (field.options[j].selected) {
              initialFormData.push({
                name: field.name,
                value: field.options[j].value,
              })
            }
          }
        }
      } else {
        initialFormData.push({
          name: field.name,
          value: field.value === "on" ? field.checked : field.value,
        })
      }
    }

    return initialFormData
  }

  return serializeArray(formElement).reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.name]: currentValue.value,
    }),
    {}
  )
}

/* 
    !NEW End
    !NEW Start
*/
