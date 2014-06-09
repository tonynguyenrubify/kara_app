kara_app
========

demo app rails with backbone js



npm install

gem install filewatcher
npm install -g clientjade

https://github.com/thomasfl/filewatcher

Then run:

filewatcher -l public/templates/*.jade "echo 'Changes Detected' && clientjade -c public/templates/*.jade > public/templates/compiled/templates.js && echo 'compile completed'"
