import Ember from 'ember';

export default Ember.Component.extend({
    error: false,

    duration: 0,
    totalTime: Ember.computed('duration', function() {
        var d = this.get('duration');
        if (isNaN(d) || !isFinite(d)) {
            d = 0;
        }
        return Math.floor(d / 60) + ':' + Math.floor(d % 60);
    }),

    position: 0,
    currentTime: Ember.computed('position', function() {
        var d = this.get('position');
        return Math.floor(d / 60) + ':' + Math.floor(d % 60);
    }),

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

        this.audio.addEventListener('waiting', function() {
            component.set_buffering(true);
        });

        this.audio.addEventListener('playing', function() {
            component.set_buffering(false);
        });

        this.audio.addEventListener('error', function(e) {
            Ember.set(component, 'error', true);
            console.log("An error occurred " + e.target.error.code);
        });

        this.audio.addEventListener('timeupdate', function() {
            Ember.set(component, "position", component.audio.currentTime);
            Ember.set(component, "duration", component.audio.duration);
        });

        this.audio.addEventListener('stalled', function() {
            console.log("Stalled... ");
        });

        this.audio.addEventListener('suspend', function() {
            console.log("Suspended... ");
        });

        this.audio.addEventListener('abort', function() {
            console.log("ABORTED...");
        });

        this.audio.addEventListener('emptied', function() {
            console.log("Emptied...");
        });

        this.audio.addEventListener('ended', function() {
            console.log("Ended...");
        });

        this.audio.addEventListener('loadstart', function() {
            console.log("Started loading...");
        });

        this.audio.addEventListener('pause', function() {
            console.log("Media PAUSED...");
        });
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
