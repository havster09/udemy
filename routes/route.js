module.exports = function(express,app,passport,config,rooms){
    var router = express.Router();
    router.get('/',function(req,res,next){
        res.render('index',{
            "title":"Welcome to Chhhhhhat cat"
        });
    });

    function securePages(req,res,next){
        if(req.isAuthenticated()){
            next();
        }
        else{
            res.redirect('/');
        }
    }

    router.get('/auth/facebook',passport.authenticate('facebook'));
    router.get('/auth/facebook/callback',passport.authenticate('facebook',{
        successRedirect:'/chatrooms',
        failureRedirect:'/'
    }));

    router.get('/logout',function(req,res,next){
        req.logout();
        res.redirect('/')
    });

    router.get('/chatrooms',securePages,function(req,res,next){
        res.render('chatrooms',{
            "title":"chatrooms",
            "user":req.user,
            "config":config
        });
    });

    router.get('/room/:id',securePages,function(req,res,next){
        var room_name = findTitle(req.params.id);
        function findTitle(room_id){
            var n = 0;
            while(n < rooms.length){
                if(rooms[n].room_number == room_id){
                    return rooms[n].room_name;
                    break;
                }
                else{
                    n++;
                    continue;
                }
            }
        }
        res.render('room',{
            "user":req.user,
            "room_number":req.params.id,
            "config":config,
            "room_name":room_name
        })
    });

    app.use('/',router);
}