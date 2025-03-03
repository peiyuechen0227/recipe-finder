import React from "react";
import { Heart, HeartPulse, Soup, Leaf } from "lucide-react";

const RecipeCard = () => {
  return (
    <div className="flex flex-col rounded-md bg-[#ecf7d4] overflow-hidden p-3 relative">
      {/* 让 <a> 作为容器 */}
      <a href="#" className="relative block h-32">
        <img
          src="/1.jpg"
          alt="recipe img"
          className="rounded-md w-full h-full object-cover cursor-pointer"
        />

        {/* 4 Servings - 固定在左下角 */}
        <div
          className="absolute bottom-2 left-2 bg-white rounded-full p-1 shadow-md 
        cursor-pointer flex items-center gap-1 text-sm"
        >
          <Soup size={16} /> 4 Servings
        </div>

        {/* 收藏按钮 - 固定在右上角 */}
        <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md cursor-pointer">
          <Heart size={20} className="hover:fill-red-500 hover:text-red-500" />
        </div>
      </a>

      {/* 标题 & 描述 */}
      <div className="mt-3">
        <p className="font-bold tracking-wide">Roasted Chicken</p>
        <p className="text-gray-600 text-sm">Turkish Kitchen</p>
      </div>

      {/* 标签区域 */}
      <div className="flex flex-wrap gap-2 mt-2">
        <div className="flex items-center gap-1 bg-[#d6f497] px-2 py-1 rounded-md">
          <HeartPulse size={16} />
          <span className="text-sm tracking-tighter font-semibold">
            Heart-healthy
          </span>
        </div>

        <div className="flex items-center gap-1 bg-[#d6f497] px-2 py-1 rounded-md">
          <Leaf size={16} />
          <span className="text-sm tracking-tighter font-semibold">
            Gluten-free
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
