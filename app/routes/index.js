import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        var radio = {
            isPlaying: false,
            isBuffering: false,
            _audio: null,
            radio_url: null,
            create: function() {
                if (!this._audio) {
                    var url = this.radio_url;
                    this._audio = new Audio(url);
                }
            },
            start_playing: function() {
                this.isPlaying = true;
            },
            stop_playing: function() {
                this.isPlaying = false;
            },
            play: function() {
                if (this._audio) {
                    this._audio.load();
                    this._audio.play();
                    this.start_playing();
                }
            },
            stop: function() {
                if (this._audio) {
                    this._audio.pause();
                    this.stop_playing();
                }
            }
        };
        return radio;
    }
});
