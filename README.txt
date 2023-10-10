Local Run instructions 

// start the api
cd api
npm install
npm run dev

// start the react app
cd standpoint
npm install
npm start

Docker Build and Run instructions

// create an image by running in repo root folder containing Dockerfile
docker build -t standpoint .

// check the images to confirm it was constructed
docker images

// running on Image
docker run -it -d -p  3000:80 --name standpoint-container standpoint

// check the container to confirm it is running
docker ps

//check local running container at http://localhost:3000