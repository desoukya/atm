module.exports.authenticatedRequest = request => {
  console.log('second')
  if(request.isAuthenticated()) {
    console.log('logged in');
    return true;
  }
  console.log('not logged in');
  return false;
}