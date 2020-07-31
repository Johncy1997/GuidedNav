import AsyncStorage from '@react-native-community/async-storage';

export default class AppData {

    static instance = null;

    language = "en"
    firstInstall = false

    /**
     * @returns {AppData}
     */
    static getInstance() {
        if (AppData.instance == null) {
            AppData.instance = new AppData();
        }
        return this.instance;
    }

    tutorialVisited(){
        this.firstInstall = false;
    }

    getLanguage() {
        return this.language;
    }
}