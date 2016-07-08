# Build a Todo App from Scratch with Ionic 2
see: http://www.joshmorony.com/build-a-todo-app-from-scratch-with-ionic-2-video-tutorial/

## Some command line code usede here

1. Add a new page to the project
    * `ionic g page AddItem`
2. Add a new provider to the project
    * `ionic g provider UserList`
    
99. Prepare for http - add the following to index.html NOTE Obsolete
    * `<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval' 'unsafe-inline' *; object-src 'self'; style-src 'self' 'unsafe-inline'; media-src *">`
    * see:  http://www.gajotres.net/ionic-2-making-rest-http-requests-like-a-pro


## Notes

Authorization:Bearer
http://homestead.app/api/users/