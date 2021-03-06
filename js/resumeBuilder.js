var dataSubstitution = function(sourceString, value) {
  return sourceString.replace('%data%', value);
};

var dataSubstitutions = function(mappings) {
  var result = [];
  for (var i = 0; i < mappings.length; i++) {
    var m = mappings[i];
    if (typeof m === 'string') {
      result.push( m );
    } else {
      result.push( dataSubstitution(m[0], m[1]) );
    }
  }
  return result.join(' ');
};

var bio = {
  name: "Dimitri Kurashvili",
  role: "Front-End Web Developer",
  contacts: {
    mobile: '(+995)555116776',
    email: 'dimakura@gmail.com',
    github: 'dimakura',
    twitter: 'dimakura',
    location: 'Tbilisi, Georgia'
  },
  welcomeMessage: 'Welcome to my personal page!',
  skills: ['JavaScript','RubyOnRails','HTML','CSS'],
  biopic: 'https://avatars1.githubusercontent.com/u/321926',
  display: function() {
    var contacts = this.contacts;

    var headerHTML = dataSubstitutions([
      [HTMLheaderName, this.name],
      [HTMLheaderRole, this.role],
    ]);

    var contactsHTML = dataSubstitutions([
      [HTMLmobile, contacts.mobile],
      [HTMLemail, contacts.email],
      [HTMLgithub, contacts.github],
      [HTMLtwitter, contacts.twitter],
      [HTMLlocation, contacts.location],
    ]);

      var welcomeHTML = dataSubstitutions([
        [HTMLbioPic, this.biopic],
        [HTMLWelcomeMsg, this.welcomeMessage],
        HTMLskillsStart
      ]);

      var skillsHTML = dataSubstitutions( this.skills.map(function(skill) { return [HTMLskills,skill]; }) );

        $('#header').prepend( $(headerHTML) );
        $('#topContacts').append( $(contactsHTML) );
        $('#footerContacts').append( $(contactsHTML) );
        $('#header').append( $(welcomeHTML) );
        $('#header').append( $(skillsHTML) );
      }
    };

var work = {
  jobs: [{
    employer: 'JSC Telasi',
    title: 'Software Developer',
    location: 'Tbilisi, Georgia',
    dates: 'June 2005 - Present',
    description: 'This is my current job'
  }],
  display: function() {
    var $job, job, jobHTML;

    for(var i = 0; i < this.jobs.length; i++) {
      job = this.jobs[i];
      $job = $( HTMLworkStart );
      jobHTML = dataSubstitutions([
        [HTMLworkEmployer, job.employer],
        [HTMLworkTitle, job.title],
        [HTMLworkDates, job.dates],
        [HTMLworkLocation, job.location],
        [HTMLworkDescription, job.description],
      ]);
      $job.append( $(jobHTML) );
      $('#workExperience').append( $job );
    }
  }
};

var projects = {
  projects: [{
    title: 'my.telasi.ge',
    dates: '2014',
    description: 'JSC Telasi Customer Portal',
    images: [ 'images/mytelasi01.png' ]
  }],
  display: function() {
    var $project, project, projectHTML;
    for(var i = 0; i < this.projects.length; i++) {
      project = this.projects[i];
      $project = $( HTMLprojectStart );
      projectHTML = dataSubstitutions([
        [HTMLprojectTitle, project.title],
        [HTMLprojectDates, project.dates],
        [HTMLprojectDescription, project.description],
      ]);
      imagesHTML = dataSubstitutions( project.images.map(function(img) { return [HTMLprojectImage, img] }) );
      $project.append( $(projectHTML + imagesHTML) );
      $project.append( $() );
      $('#projects').append( $project );
    }
  }
};

var education = {
  schools: [{
    name: 'Tbilsi State University',
    location: 'Tbilisi, Georgia',
    degree: 'Bachelor',
    majors: [ 'Physics' ],
    dates: 2000,
    url: 'http://tsu.edu.ge'
  }, {
    name: 'High Energy Physics Institute',
    location: 'Abasha, Georgia',
    degree: 'Masters',
    majors: [ 'Physics' ],
    dates: 2002,
    url: 'http://hepi.edu.ge'
  }],
  onlineCourses: [{
    title: 'Front-End Web Developer Nano Degree',
    school: 'Udacity',
    date: 2015,
    url: 'http://udacity.com/course/nd001'
  }],
  display: function() {
    var education = this
    , schools = education.schools
    , courses = education.onlineCourses
    , schoolHTML, school, $school
    , i;

    for(i = 0; i < schools.length; i++) {
      school = schools[i];
      $school = $(HTMLschoolStart);
      schoolHTML = dataSubstitutions([
        [HTMLschoolName, school.name],
        [HTMLschoolDegree, school.degree],
        [HTMLschoolDates, school.dates],
        [HTMLschoolLocation, school.location],
        [HTMLschoolMajor, school.majors.join()],
      ]);
      $school.html( schoolHTML );
      $('#education').append( $school );
    }

    $('#education').append( $(HTMLonlineClasses) );
    for(i = 0; i < courses.length; i++) {
      school = courses[i];
      $school = $(HTMLschoolStart);
      schoolHTML = dataSubstitutions([
        [HTMLonlineTitle, school.title],
        [HTMLonlineSchool, school.school],
        [HTMLonlineDates, school.date],
        [HTMLonlineURL, school.url],
      ]);
      $school.html( schoolHTML );
      $('#education').append( $school );
    }
  }
};

// building resume

bio.display();
work.display();
projects.display();
education.display();
