module.exports = function(io,rooms){
    // http://localhost:3000/roomlist
    var chatrooms = io.of('/roomlist')
        .on('connection',function(socket){
            console.log('connection established on server');
            socket.emit('roomupdate',JSON.stringify(rooms));

            socket.on('newroom',function(data){
                rooms.push(data);
                socket.broadcast.emit('roomupdate',JSON.stringify(rooms));
                socket.emit('roomupdate',JSON.stringify(rooms));
            })
        });

    var messages = io.of('/messages').on('connection',function(socket){
        console.log('Connected to the Chatroom !');

        socket.on('joinroom',function(data){
            socket.username = data.user;
            socket.userPic = data.userPic;
            socket.join(data.room);
            updateUserList(data.room,true);
        });

        socket.on('newMessage',function(data){
            console.log(data);
            socket.broadcast.to(data.room_number).emit('messagefeed',JSON.stringify(data));
        });

        function updateUserList(room,updateAll){
            var getUsers = io.of('/messages').clients(room);
            var userlist = [];

            for(var i in getUsers){
                userlist.push({
                    user:getUsers[i].username,
                    userPic:getUsers[i].userPic
                });
            }
            socket.to(room).emit('updateUsersList',JSON.stringify(userlist));

            if(updateAll){
                socket.broadcast.to(room).emit('updateUsersList',JSON.stringify(userlist));
            }
        }
        socket.on('updateList',function(data){
            updateUserList(data.room);
        })
    });
}