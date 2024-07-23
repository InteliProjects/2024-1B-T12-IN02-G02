
module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // ADM Create Team
  'GET /admin/createGame': { view: 'pages/admin/createGame' }, // Page to create game
  'GET /admin/createUniverses': 'AdminController.createUniversesPage', // Page to create Universe
  'GET /admin/createTeams': 'AdminController.createTeamsPage', // Page to create and update teams
  'GET /admin/manageUniverse': { view: 'pages/admin/manageUniverse' }, // Page to change Universe round

  'POST /admin/createGame': 'AdminController.createGame', // Creating a team in the database
  'POST /admin/createUniverse': 'AdminController.createUniverse', // Creating Universe in the database
  'POST /admin/createTeam': 'AdminController.createTeam', // Creating Team in the database
  'POST /updateTeam': 'AdminController.updateTeam', // Updating a team in the database
  'POST /updateRound': 'AdminController.updateRound', // Updating a round in the database

  'GET /listUniverse': 'AdminController.listUniverse', // List all universes
  'GET /listUser': 'AdminController.listUser', // List all users
  'GET /listTeam': 'AdminController.listTeam', // List all teams
  'POST /user/update-happiness': 'UserController.updateHappiness', // Update user happiness

  // Route for the main page
  '/main': { view: 'pages/main' },

  // Routes for the login page
  '/': { view: 'pages/entrance/login' },
  'POST /login': 'UserController.login', // Handle user login
  '/forgotPassword1': { view: 'pages/entrance/forgotPassword_email' }, // Forgot password (email)
  '/forgotPassword2': { view: 'pages/entrance/forgotPassword_safetyCode' }, // Forgot password (safety code)

  // Route for the signup page
  '/signup': { view: 'pages/entrance/signup' },
  'POST /signup': 'UserController.signup', // Handle user signup
  '/logout': 'UserController.logout', // Handle user logout

  // Route for help page
  '/help' : { view: 'pages/help', locals: { layout: false } },

  // Route for the welcome page
  '/welcome': { view: 'pages/welcome', layout: false },
  'GET /welcome' : 'WelcomeStatusController.teamStatus',

  // Routes for the team page
  '/team-page': { view: 'pages/team-page' },
  'GET /findMembers': 'TeamController.findMembers', // Find team members
  'PUT /user/:id/status': 'StatusController.changeStatus', // Change user status
  'GET /user/:id/status': 'StatusController.getStatus', // Get user status
  'GET /team-page/teamStrengthsCollaboration': 'TeamController.teamStrengthsCollaboration', // Team strengths (collaboration)
  'GET /team-page/teamStrengthsDecisionMaking': 'TeamController.teamStrengthsDecisionMaking', // Team strengths (decision making)

  // Route for the user profile page
  '/view-personal-profile': { view: 'pages/view-personal-profile' },
  'GET /my-profile': 'MyProfileController.showProfileForm', // Show profile form
  'GET /view-personal-profile': 'MyProfileController.showUserProfile', // Show user profile
  'POST /profileData': 'MyProfileController.updateProfile', // Update profile data

  // Route to process the collaboration feedback
  '/feedbackPreGameCollaboration': 'ProfessionalProfileController.feedbackPreGameCollaboration',

  // Route to display the professional profile page
  'GET /collaboration-style': 'ProfessionalProfileController.showFeedback',

  'GET /decision-making-style': 'PreGameDmController.showFeedback',

  // Route for collaboration-style page, where feedback of self-assessment collaboration is shown
  '/collaboration-style': { view: 'pages/collaboration-style' },
  '/collaboration-style/graphCollaboration': 'ProfessionalProfileController.graphCollaboration',

  // Route for decision-making-style page, where feedback of self-assessment decision-making is shown
  '/decision-making-style': { view: 'pages/decision-making-style' },
  '/decision-making-style/graphDecisionMaking': 'ProfessionalProfileController.graphDecisionMaking',

  // Route for the other profile page
  '/other-profile': { view: 'pages/other-profile' },
  'GET /profile': 'OtherProfileController.profile', // Get profile
  'GET /user/:id': 'OtherProfileController.getUser', // Get user by ID
  '/other-profile-lineGraph': 'OtherProfileController.lineGraph',

  // Routes for assessment pages
  '/assessment/self-assessment-collaboration': { view: 'pages/assessment/self-assessment-collaboration', locals: { layout: false } }, // Route for the self-assessment collaboration page
  'POST /self-assessment-collaboration': 'PreGameCollaborationController.create', // Handle self-assessment collaboration submission

  '/assessment/self-assessment-decision-making': { view: 'pages/assessment/self-assessment-decision-making', locals: { layout: false } }, // Route for the self-assessment decision-making page
  'POST /self-assessment-decision-making': 'PreGameDmController.create', // Handle self-assessment decision-making submission

  '/assessment/group-assessment-collaboration': { view: 'pages/assessment/group-assessment-collaboration' }, // Route for the group assessment collaboration page
  'POST /group-assessment-collaboration': 'GroupAssessmentCollaboration.create', // Handle group assessment collaboration submission

  '/assessment/group-assessment-decision-making': { view: 'pages/assessment/group-assessment-decision-making' }, // Route for the group assessment decision-making page
  'POST /group-assessment-decision-making': 'GroupAssessmentDmController.create', // Handle group assessment decision-making submission

  '/assessment/self-assessment-confirmation': { view: 'pages/assessment/self-assessment-confirmation', locals: { layout: false } }, // Confirmation page for self-assessment's

  '/assessment/feedback': { view: 'pages/assessment/feedback' }, // Route for the feedback page
  '/assessment/feedback-collaboration': { view: 'pages/assessment/feedback-collaboration' }, // Route for the feedback collaboration page
  '/assessment/feedback-decision-making': { view: 'pages/assessment/feedback-decision-making' }, // Route for the feedback decision-making page
  '/assessment/feedback-collaboration/round': 'FeedbackCollaborationController.round', // Route for FeedbackCollaborationController.round
  '/assessment/feedback-collaboration/showFeedbacks': 'FeedbackCollaborationController.showFeedbacks', // Show feedbacks for collaboration
  '/assessment/feedback-decision-making/round': 'FeedbackDecisionMakingController.round', // Route for FeedbackDecisionMakingController.round
  '/assessment/feedback-decision-making/showFeedbacks': 'FeedbackDecisionMakingController.showFeedbacks', // Show feedbacks for decision making

  //Route for upload a new image
  'POST /update-profile': 'MyProfileController.updateProfile',
  'POST /upload': 'UploadController.uploadImage',


};



/***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/



