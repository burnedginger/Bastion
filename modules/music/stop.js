/**
 * @file stop command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.run = (Bastion, message) => {
  if (!message.guild.music) {
    /**
     * Error condition is encountered.
     * @fires error
     */
    return Bastion.emit('error', Bastion.strings.error(message.guild.language, 'emptyQueue'), Bastion.strings.error(message.guild.language, 'notPlaying', true), message.channel);
  }

  if (message.channel.id !== message.guild.music.textChannelID) return;

  message.guild.music.textChannel.send({
    embed: {
      color: Bastion.colors.RED,
      description: 'Stopped Playback.'
    }
  }).then(() => {
    if (message.guild.music) {
      message.guild.music.songs = [];
    }
    message.guild.music.dispatcher.end();
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [],
  enabled: true,
  musicMasterOnly: true
};

exports.help = {
  name: 'stop',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'stop',
  example: []
};
