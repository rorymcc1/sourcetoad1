var arr = [
  {
    guest_type: "crew",
    first_name: "Marco",
    last_name: "Burns",
    guest_booking: {
      room_no: "A0073",
      some_array: [7, 2, 4]
    }
  },
  {
    guest_type: "guest",
    first_name: "John",
    last_name: "Doe",
    guest_booking: {
      room_no: "C73",
      some_array: [1, 3, 5, 2, 4, 3]
    }
  },
  {
    guest_type: "guest",
    first_name: "Jane",
    last_name: "Doe",
    guest_booking: {
      room_no: "C73",
      some_array: [1, 3, 5, 2, 4, 3]
    }
  },
  {
    guest_type: "guest",
    first_name: "Albert",
    last_name: "Einstein",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3]
    }
  },
  {
    guest_type: "crew",
    first_name: "Jack",
    last_name: "Daniels",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3]
    }
  },
  {
    guest_type: "guest",
    first_name: "Alan",
    last_name: "Turing",
    guest_booking: {
      room_no: "B15",
      some_array: [2, 5, 6, 3]
    }
  }
];

//Is input parameter an obj or associtive array
let isPlainObject = function(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
};

//Sum Only Numeric Array Components
let sumArray = function(total, num) {
  let sum = 0;
  if (typeof total == "number" && typeof num == "number") {
    sum = total + num;
  } else if (typeof total == "number") {
    sum = total;
  } else if (typeof num == "number") {
    sum = num;
  }
  return sum;
};

//Flatten only associtive arrays - recursive function
let flattenAssoc = function(key, multi, flat) {
  if (isPlainObject(multi)) {
    $.each(multi, function(index, value) {
      flattenAssoc(index, value, flat);
    });
  } else if (Array.isArray(multi)) {
    flat[key.replace("array", "total")] = multi.reduce(sumArray);
  } else {
    flat[key] = multi;
  }
  return;
};

//Is this person a guest
let isGuest = function (person) {
  return person.guest_type === "guest";
}

//Mutate Array Objects
function mutateArray(a) {
  $.each(a, function(index, value) {
    let flattened = {};
    flattenAssoc(index, value, flattened);
    a[index] = flattened;
  });
  return a.filter(isGuest);
}

$(document).ready(function() {
  $("#originalArray").html(JSON.stringify(arr, null, 2));
  $("#resultsArray").html(JSON.stringify(mutateArray(arr), null, 2));
});
