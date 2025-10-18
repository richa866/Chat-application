import pfp from "../assets/pfp.png";
export default function MsgCard({username ,profile ,isOnline}){
  return (
      <div className="bg-white/15 backdrop-blur-lg border  border-pink-400/50 rounded-xl p-4 shadow-lg hover:bg-white/20 w-full transition-all cursor-pointer">
    <div className="flex items-center space-x-3">
      <div className="relative">
        <img
          src={profile || pfp}
          alt={username}
          className="w-10 h-10 rounded-full object-cover"
        />
        {isOnline && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium text-xl">{username}</h3>
          <span className="text-white/60 text-xs">11:30</span>
        </div>
        <p className="text-white/70 text-sm truncate">hello how u been</p>
      </div>
    </div>
  </div>
  )   
}


