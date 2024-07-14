# Horse Racing Game

This project is a game project in which users can play horse racing. Vue.js is built using modern web technologies such as Vue CLI and Vuex. The main feature of the project is that it is a racing program covering 6 different races with 10 horses randomly selected from a list containing 20 different colored horses. Each horse's condition, which varies between 1 and 100, affects its performance at different race distances and provides a realistic racing experience.

When the **GENERATE PROGRAM** button is pressed, 10 horses are randomly selected from 20 horses. The selected horses appear in the Program table. These horses are placed on the race track with their position numbers.

<img width="1470" alt="1" src="https://github.com/user-attachments/assets/d644d574-f50e-49db-82c3-ec616494c539">

The **START/PAUSE** button has several functions. To start or stop the race. If the race has not started, it starts the race. If this button is pressed during the race, the race will be stopped. If the button is pressed after the race is stopped, the race continues from where it left off.

<img width="1470" alt="2" src="https://github.com/user-attachments/assets/86b37a12-e6e1-4f3a-b070-9a45576e7770">
<img width="1470" alt="3" src="https://github.com/user-attachments/assets/2c0c9fbe-733c-4254-a7fa-03ec103ff12b"><br>

When the race is over, all horses stop at the **finish line**

<img width="1470" alt="4" src="https://github.com/user-attachments/assets/4521461e-ca69-4051-9862-eb281e139499"> </br>
## Rules

- There should be 20 horses for the race.
- Each horse must be a different color.
- The condition of each horse should be between 1-100.
- 6 rounds of running must be done in 1 race.
- Each round must run 10 horses randomly selected out of 20 horses.
- 6 rounds respectively (1200m, 1400m, 1600m, 1800m, 2000m, 2200m) should be done in these lengths.
- Vuex store usage expected.
- Component design expected.
  
## Setup

### Repository Download and Installation

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/aleynakoluk/horse-racing-app.git
cd horse-racing-app
cd horse-racing-game
```

Installing Required Packages

```bash
npm install
```

Starting the Application
```bash
npm run serve
```

After the application starts, you can view it at http://localhost:8080.

## Watch the video
[Watch the video demonstration here](https://drive.google.com/file/d/1xrcepdHvG5uF3FKMVM3or26baHsE0tFc/view?usp=drivesdk)


