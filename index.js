const Discord = require('discord.js');
const client = new Discord.Client();


//list of role and current id #'s for use retrieved w/ message.guild

const private = '409243528108048385';
const corporal = '409244953059917824';
const sergeant = '409245074820694016';
const sergeantmajor = '409244894037803012';
const firstlieutenant = '409244284491923467';
const colonel = '409244220495233035';
const brigadiergeneral = '409243814058917890';

//list of roles each Rank should have.
const corporal_list = [private, corporal];
const sergeant_list = [private, corporal,sergeant];
const sergeantmajor_list = [private, corporal,sergeant,sergeantmajor]
const firstLieutenant_list = [private, corporal,sergeant,sergeantmajor,firstlieutenant]
const colonel_list = [private, corporal,sergeant,sergeantmajor,firstlieutenant,colonel];
const brigadiergeneral_list = [private, corporal,sergeant,sergeantmajor,firstlieutenant,colonel, brigadiergeneral];

const private_inv = 1;
const corporal_inv = 3;
const sergeant_inv = 10;
const sergeantmajor_inv = 25;
const firstlieutenant_inv = 50;
const colonel_inv = 150;
const brigadiergeneral_inv = 500;

let executeCount = 1;

const checkRole = (desiredRole,currentRole) =>{  //checks to see if user has the highest role based on his invite count
  if(desiredRole === currentRole){
    return true;
  } else return false;
}

const getMissingRoles = (current_user_roles,list) =>{   //returns an array of roles a user is missing, if he skips ranks.
  for(let i = 0; i < current_user_roles.length; i++){
    for(let l = 0; l < list.length; l++){
      if(current_user_roles[i] === list[l])
      {
        list.splice(l,1);
      }
    }
  }
  return list;
}

client.on('ready', () => {
  console.log('Invite Bot has Started!'); //lets us know bot loaded in
});

client.on('message', message => {
  if(message.author.equals(client.user)){   //prevents bot talking to itself just incase (even tho we know its not gonna execute !invites)
    return;
  }
  let invite_command = message.content.toLowerCase();

  if(invite_command === '!invites'){             //checks if message is !invites to execute command
    let invites = message.guild.fetchInvites();  //gets all guild invites
    let userID = message.author.id;             //retrieves user's ID who requested the command
    let inviteAmount = 0;

    invites.then(m =>{
      m.forEach(collection =>{
        //log I used for debugging data retrieved from fetchInvites()
        //to see all data retrieved use  -- console.log(m);

    /*  console.log('\n\n\ninvite code: ',collection.code,
                    '\ninvite uses: ', collection.uses,
                    '\ninviter:', collection.inviter.id); */

        if(collection.inviter.id === userID){               //log to check each invite was added correctly
          inviteAmount = collection.uses + inviteAmount;    //console.log('added ' + collection.code + ' with ' + collection.uses + ' to the total amount of ' + inviteAmount);
        }
      })
      //edit inviteAmount here to test invite bot functions.
      //inviteAmount = 512;

      let current_member = message.guild.member(message.author);
      let invite_reply = ('you currently have ' + inviteAmount + ' invites! ');
      let current_role = current_member.highestRole.id;
      let current_member_role_array = current_member._roles;

      //console.log(current_member_role_array);
      //console.log(current_role, current_member.highestRole.name);

      //checks your invite amount and updates your role/rank by invite amount!
      if(inviteAmount === 0){
        message.reply(invite_reply + 'you need ' + (private_inv - inviteAmount) + ' more invites to rank up to Private!');
      }

      else if (inviteAmount <= 2){
        let hasRole = checkRole(private,current_role);
        if(hasRole){
          message.reply(invite_reply + ' You need ' + (corporal_inv - inviteAmount) + ' more invites to rank up to Corporal!');
        } else {
          current_member.addRole(private);
          message.reply(invite_reply + ' Congrats you have been promoted to Private!');
        }
      }

      else if(inviteAmount <= 9){
        let hasRole = checkRole(corporal,current_role);
        if(hasRole){
          message.reply(invite_reply + ' You need ' + (sergeant_inv - inviteAmount) + ' more invites to rank up to Sergeant!')
        } else {
          let missingRoles = getMissingRoles(current_member_role_array,corporal_list);
          current_member.addRoles(missingRoles);
          message.reply(invite_reply + ' Congrats you have been promoted to Corporal!');
        }
      }

      else if(inviteAmount <= 24){
        let hasRole = checkRole(sergeant,current_role);
        if(hasRole){
          message.reply(invite_reply + ' You need ' + (sergeantmajor_inv - inviteAmount) + ' more invites to rank up to SergeantMajor!')
        } else {
          let missingRoles = getMissingRoles(current_member_role_array,sergeant_list);
          current_member.addRoles(missingRoles);
          message.reply(invite_reply + ' Congrats you have been promoted to Sergeant!');
        }
      }

      else if(inviteAmount <= 49) {
        let hasRole = checkRole(sergeantmajor,current_role);
        if(hasRole){
          message.reply(invite_reply + ' You need ' + (firstlieutenant_inv - inviteAmount) + ' more invites to rank up to FirstLieutenant!')
        } else {
          let missingRoles = getMissingRoles(current_member_role_array,sergeantmajor_list);
          current_member.addRoles(missingRoles);
          message.reply(invite_reply + ' Congrats you have been promoted to SergeantMajor!');
        }
      }

      else if(inviteAmount <= 149){
        let hasRole = checkRole(firstlieutenant,current_role);
        if(hasRole){
          message.reply(invite_reply + ' You need ' + (colonel_inv - inviteAmount) + ' more invites to rank up to Colonel!')
        } else {
          let missingRoles = getMissingRoles(current_member_role_array,firstLieutenant_list);
          current_member.addRoles(missingRoles);
          message.reply(invite_reply + ' Congrats you have been promoted to FirstLieutenant!');
        }
      }

      else if(inviteAmount <= 499){
        let hasRole = checkRole(colonel,current_role);
        if(hasRole){
          message.reply(invite_reply + ' You need ' + (brigadiergeneral_inv - inviteAmount) + ' more invites to rank up to Brigadier General!')
        } else {
          let missingRoles = getMissingRoles(current_member_role_array,colonel_list);
          current_member.addRoles(missingRoles);
          message.reply(invite_reply + ' Congrats you have been promoted to Colonel!');
        }
      }

      else if(inviteAmount >= 500){
        let hasRole = checkRole(brigadiergeneral,current_role);
        if(hasRole){
          message.reply(invite_reply)
        } else {
          let missingRoles = getMissingRoles(current_member_role_array,brigadiergeneral_list);
          current_member.addRoles(missingRoles);
          message.reply(invite_reply + ' Congrats you have been promoted to Brigadier General!');
        }
      }
    })
    console.log('Executed a invites command! Currently ' + executeCount + ' have been excited since turned on!' );
    executeCount += 1;
  }

/*Overall: Retrieves User's ID then execute's through all of the invite codes in a Server to find
           all the invite codes created by him using his userID to then determine the amount of invites
           that this user has invited. Then Promotes his Roles based on invites. */
});

client.login(process.env.BOT_TOKEN);
