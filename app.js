

const saveIssue = (e) => {
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueId = chance.guid();
    let issueStatus = 'open';

    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();
    fetchIssues();

    e.preventDefault();
}


document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

const setStatusClosed = (id) => {
    let issues = JSON.parse(localStorage.getItem('issues'));
    for (let i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues[i].status = 'Closed';
      }
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
  }
  
  const deleteIssue = (id) => {
    let issues = JSON.parse(localStorage.getItem('issues'));
    for (let i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
  }


const fetchIssues = () => {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesListe = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id;
        let desc = issues[i].description;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;

        issuesList.innerHTML += '<div class="well">'+ 
                                '<h6>Issue ID: ' + id + '</h6>'+
                                '<p><span class="label label-info">' + '<strong>Status:</strong> ' + status + '</span></p>'+
                                '<h3>' + desc + '</h3>'+
                                '<p><span class="glyhicon glyphicon-time"></span>' + '<strong>Severity:</strong>  ' + severity + '</p>'+
                                '<p><span class="glyhicon glyphicon-user"></span>'+ '<strong>Staff:</strong> ' + assignedTo + '</p>'+
                                '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn1">Close</a>'+
                                '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn2">Delete</a>'+
                                '</div>';

    }
}