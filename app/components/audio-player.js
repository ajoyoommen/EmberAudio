import Ember from 'ember';

export default Ember.Component.extend({
    error: false,
    isPlaying: false,
    isBuffering: false,
    audio: null,
    radio_url: null,
    create() {
        if (!this.audio) {
            var url = this.radio_url;
            var audio = new Audio(url);
            Ember.set(this, 'audio', audio);
        } else {
            this.audio.src = this.radio_url;
            this.audio.load();
            this.stop_playing();
        }

        var component = this;

        this.audio.onwaiting = function() {
            component.set_buffering(true);
        };

        this.audio.onplaying = function() {
            component.set_buffering(false);
        };

        this.audio.onerror = function(e) {
            Ember.set(component, 'error', true);
            console.log("An error occurred " + e.target.error.code);
        };
    },
    set_buffering(value) {
        Ember.set(this, 'isBuffering', value);
    },
    start_playing() {
        Ember.set(this, 'isPlaying', true);
    },
    stop_playing() {
        Ember.set(this, 'isPlaying', false);
    },
    play() {
        if (this.audio) {
            this.audio.load();
            this.audio.play();
            this.start_playing();
        }
    },
    stop() {
        if (this.audio) {
            this.audio.pause();
            this.stop_playing();
        }
    },
    actions: {
        initRadio() {
            this.create();
            this.play();
        },
        clear() {
            this.stop();
            Ember.set(this, 'radio_url', '');
            Ember.set(this, 'audio', null);
            Ember.set(this, 'error', false);
        },
        play() {
            this.play();
        },
        stop() {
            this.stop();
        }
    }
});
