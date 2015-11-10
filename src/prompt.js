import inquirer from 'inquirer';
import q from 'q';

function promptForURL () {
  const deferred = q.defer();
  inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter URL for health check',
      default: '127.0.0.1:8080'
    }
  ], (answers) => deferred.resolve(answers.url));
  return deferred.promise;
}

export {
  promptForURL
};
