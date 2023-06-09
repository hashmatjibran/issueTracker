$(document).ready(function () {
  // javascript for select2 i.e select boxes using select2

$("#filterByLabelInput").select2({
  tags: true,
  tokenSeparators: [',', ' '],
  width:'resolve',
  allowClear: true,
  placeholder : "Enter lable/labels to filter issues"
})

$(".js-select2").select2({
  placeholder : "Assign a lable",
  tokenSeparators: [',', ' '],
  tags: true, // создает новые опции на лету
  allowClear: true,
  dropdownParent: $("#staticBackdrop"),
  width:'resolve'
});
});


 
//  created a function that will close the model after user submits the data
 addProject = ()=>{
    // closing the modal after taking userInput
    let closebtn = document.getElementById('closeBtn');
    closebtn.click();
}


// this function is used to filter all the data displayed via title (i.e filter by title function )
function filterFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }


  // creating a function to filter Issues by Author
  function filterByAuthor (e){

    e.preventDefault();
    // getting project id as we will be using it to fetch the issues of that particular project
    const projectId = e.target.dataset.projectid;
    
    // getting the entered value of author
    const authorValue = $('#authorValue').val();
    
    // creating an ajax request to get the issues and filter them by author
    $.ajax({
        type: "post",
        url: "/issues/filterbyauthor",
        data: {
            author:authorValue,
            projectId
        },
        success: function (response) {
          // populating the data using dom manipulation
            let tableData = $('#myTable');
            tableData.empty();
            let data =
            `<tr class="header">
                <th style="width:30%;" onclick="sortTable(0)" class="titletd"> Title <small>(author)</small></th>
                <th style="width:50%;" onclick="sortTable(1)"> Description</th>
            </tr>` ;

        for(issue of response){
            data +=
                    `<tr>
                        <td> ${issue.title} <small>(${issue.author})</small></td>
                        <td> ${issue.description}</td>
                        
                    </tr>`;
        }
        // writing new data to the table
        tableData.html(data);

        // closing the modal
        $('#filterByAuthorBtnClose').click();
        },
        error: function(error){
            if(error){
                console.log(`error in filterbyAuthor function and error is :`,error);
            }
        }
    });
    
  }


//   sorting the table in assending and descending order
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }



  // filter the issues on the basis of labels
  function filterByLabel(e) { 
    const newLabels  = $('#filterByLabelInput').select2('val');

    const projectId = e.target.dataset.projectid;

    $.ajax({
      type: "post",
      url: "/issues/filterbylabels",
      data: {
        'projectId':projectId,
        'newLabels':JSON.stringify(newLabels)
      },
      
      dataType: 'JSON',
      success: function (response) {
        let tableData = $('#myTable');
        tableData.empty();
        let data =
        `<tr class="header">
            <th style="width:30%;" onclick="sortTable(0)" class="titletd"> Title <small>(author)</small></th>
            <th style="width:50%;" onclick="sortTable(1)"> Description</th>
        </tr>` ;

    for(issue of response){
        data +=
                `<tr>
                    <td> ${issue.title} <small>(${issue.author})</small></td>
                    <td> ${issue.description}</td>
                </tr>`;
    }
    // writing new data to the table
    tableData.html(data);

      }
    });

   }




