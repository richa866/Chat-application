"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { useChatStore } from "../store/useChatStore"
export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false)
  const [searchValue, setSearchValue] = useState("")
const { searchTerm, setSearchTerm}=useChatStore();

  

  return (
    <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl p-3 shadow-lg flex-1">
    <div className="flex items-center space-x-3">
      <Search className="w-5 h-5 text-white/60"/>
      <input
        type="text"
        placeholder="Search..."
        onClick={()=>setIsFocused(true)}
        value={searchTerm}
        onBlur={()=>setIsFocused(false)}
        onChange={(e)=>setSearchTerm(e.target.value)}
        className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-sm"
      />
      
    </div>
  </div>
  )
}
