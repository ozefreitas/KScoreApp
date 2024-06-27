## [] (June 2024) (_not ready_) (LATEST)

### Added

- CHANGELOG file
- Start integration with the [Karate Score App webSite](https://karate-score-app.netlify.app)

### Changes

-

## Fixes

-

## [0.8.4] (June 2024) (_not ready_)

### Added

- Classification screen for _Team Kata_ and _Kihon_
- New Light Theme
- Button to switch between a lighter and a black background
- Transitions between colors and opening and closing of the navigation bar
- Classification screen now show a header to reference from which category the results are from

### Changes

- All pages now change its color accordingly to the selected theme
- Not just background, but also the other components in order to provide a better visualization
- Changed "styles" for "className" in the NavBar.jsx

## Fixes

- Bugs with the "placeholder" like category default value color

## [0.8.3] (June 2024) (_not ready_)

### Added

- New classification screen for _Kata_
- These now also check for potential tiebreakers
- New key binds to store each match player and the given punctuation, and delete it by the end
- User guidance and error prevention
- Variables.css added to store reusable CSS properties like colors and effects
- Feature in _Kumite_ to end a match at 2 points only for the lower category, instead of 3
- Score Control to cluster ALL input control for _Kumite_ and _Team Kumite_

### Changes

- Players input file now doesn't need to condensate data, each entry will be a resource
- Change the color from code to var() function
- Change .blinking in the CSS modules to just a "blinking" class, retrieving its style from the "variables.css"

## Fixes

- Bug in the Kata file processing
- Major bugs with the controls of _Kumite_ fixed
- Fixed a bug with setStates and UseEffects usage resulting in infinite rendering
- Fixed a bug where clicking in a blinking match didn't stop the blinking effect

## [0.8.0] (June 2024) (_not ready_)

### Added

- _Kihon_ and _Kihon_ Finals page
- Match Type added: now categories depend on the match that is selected (_Kata_ or _Kumite_)
- Clicking in the "_Ippon_" and "_Waza-ari_" spans of both players in the _Kumite_ and _Team Kumite_ pages, subtracts one to that point (reflecting in the final score). This never falls bellow 0
- In _Team Kumite_ added functionality to store the results of each match, instead of just clicking in div to say each team on each match: this resets all paramerts at the same time
- Blinking effect added also to the match results squares

### Changes

- Current page to accept _Kihon_
- State placement change to allow recycling
- Header allows _Kihon_
- Categories redesigned: object with one set to Individual categories, and other with team categories
- _Kihon Finals_ are in the same page as _Kata Finals_ (design is the same). Header allows clicking in the match type span to change between _Kata_ and _Kihon_
- Player input file changed again: type is now one of the keys
- Pages with punctuation as scoring method, when selecting a scoring box, that now changes color instead of having the cursor

### Fixes

- Major bugs appearence. **Version not ready for production!** Will be incrementally fixed in latter versions
- Team name wouldn't reset, added useEffect to the eventListener

## [0.7.4] (June 2024)

### Added

- Scroll feature added to the navigation bar when this is triggered by clicking in a missing file link: it now scrolls to the intended item in the list
-

### Changed

- Tatami number in the header now stays untouched even after swapping pages

### Fixes

- Bug with the TeamKumite page name
- Bug with the use of state inside setState inside UseEffect not getting the most recent state solved
- Winners blinking to all pages were missing, now fixed

## [0.7.3] (June 2024)

### Added

#### Kumite:

- Gong sound for **Kumite** and **Team Kumite** for the last 30 seconds and end of matches
- Each two fouls, the opposing player recieves one point
- At three fouls, the opposing player is disqualified
- Removing fouls, reverts all
- If timer gets to 0, wins the player with the most points scored
- If draw, both blink
- Now is possible to set the timer with the ArrowUp and ArrowDown

#### All

- When win, player banner, number that perceives the win and belt color blinks:
  - Points scored (_Kumite_)
  - Number of flags (_Kata_)

### Changes

- Categories corrected AGAIN
- Team files now have the number of the team, and the team (dojo) they belong
- Change default notification API system for the custom

## Fixes

- Team Draw bug fixed
- Fixed some bugs in the player banners

## [0.7.2] (June 2024) (ready to )

### **First time public display in 8 June 2024** 🥰

### Added

-Key binding to set timer to 1:30 for lower category

### Changes

- **Team Kumite** Teams input now don´t change when pressing key bind to delete screen contents

## [0.7.1] (June 2024)

### Added

- Changes to general draw generation

### Changes

- Categories corrected again

## [0.7.0] (June 2024)

### Added

- Elimination via "Polls" finished
- Now able to download the Elimination draw:
  - This file has the **name**, **number** and **team** for each playes, and the given belt for that match for each one

### Changed

- Method of input Players
- Categories updated for both League and Tournaments
- Methods to create the `.XLSX `
- Matches Draw page is now dependent of the Group Draw

### Fixes

- Changing category with a done draw, removes that draw

## [0.6.4] (June 2024)

### Added

- Favority key for Players
- Wrong file handler and notification for such
- Elimination via "Polls" started

### Changes

- Input file processing to accomodate new key

## [0.6.3] (June 2024)

### Added

- Modality ("Individual" or "Team") functionality added for draw convinience
- Same principle as category: Player registration is divided between "individual" and "team"
- Draw screen now helps the user to know how much players are selected to proceed to the draw itself
- Possibility to change between 4 and 8 players for _Kata_ and _Team Kata_ Elimination Draws
- utils folder to store usefull functions

### Changes

- Costum Notification now takes to account the modality in cause. User is unable to see a draw or select players if Modality is not selected
- App will instruct the user to input the respective Players or Teams file, depending of the chosen modality, and if the file is still not given

### Fixes

- Major crashing bugs discovered and fixed for _Kata_ and _Kumite_ Matches Draw

## [0.6.2] (May 2024)

### Added

- Start Team Draw both for elimination and random order type draws

### Changes

- Group and Matches Draw optimization

## [0.6.1] (May 2024)

### Added

- Download actions

## [0.6.0] (May 2024)

### Added

- Matches Draw completed
- Current page is now highlighted in the navigation bar

### Changes

- States placement

## [0.5.4] (May 2024)

### Added

- Start Elimination Draw implementation
- More user guidance with custom notification

## [0.5.3] (May 2024)

### Fixes

- Small bug and implementation discordances

## [0.5.2] (May 2024)

### Added

- User guidance ennhaced
- Start Group Matches Draw implementation

### Changes

- General optimization
- Bit of restructuring

## [0.5.1] (May 2024)

### Added

- Default warnings and error handling swaped to new notification/warning system:
  - Prevents the app to crash
  - Advises the user of what to do next in case something wrong, file is missing or a input is unavailable or wrong, or a step was forgotten
- User can now download a file (`.XLSX`) with the draw
  - This file has: **name**, **number** and **team** of each player in each group
  - It is divided between groups
- Ability to remove or add players to participate in the draw

### Changed

- General optimization changes for components recycling

### Fixes

- General bug fixes

## [0.3.3] (April 2024)

### Added

- Blink effects for input file's locations in the navigation bar
- Warnings for player files missing
- Link for input location in nav bar if file is missing

## [0.3.2] (April 2024)

### Added

- Draw System for League competitions
- UI for Player Selection for group drawing
- UI for drawn groups
- Category now determines which players appear in the pre-draw selection window, according to the category each player is registered
- Auto scrolling animations

### Changed

- Hardcoded English text to Portuguese
- Better UI for category selection
- Input file format

### Fixes

- Error handling for wrong input files
- Input file processing to accept new format

## [0.2.1] (April 2024)

### Added

- Key event listeners

## [0.2.0] (April 2024)

### Added

- New Login page

### Changed

- Components proping

## [0.1.0] (April 2024)

### **Ready for production**

### Added

- _Kata Final_ page
- _Kumite_ page
- _Team Kata_ page
- _Team Kumite_ page
- Paging (Reach Routing - Single Page Application)

### Changed

- Project structuring with pages

## [0.0.3] (March 2024) (_not public_)

### Added

- Navigation Bar
- File input for players and _Kata_

## [0.0.2] (March 2024) (_not public_)

### Added

- Server Backend and Endpoints for player information retrievel (attemp)
- [MongoDB](https://www.mongodb.com/) connection via API
- KeyBindings for score manipulation

### Changed

- Players scoring system and information

## [0.0.1] (March 2024) (_not public_)

### Added

- [Electron JS](https://www.electronjs.org/) setup
- First Header and _Kata Elimination_ implementation
- _Hantei_ scoring system

## [0.0] (March 2024) (_not public_)

### Added

- Initial Commit
- Start of the project
- Project structure setup
