"use client";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

const brands = () => {
  const brandsMap: Record<string, string> = {
    dji: "DJI",
    parrot: "Parrot",
    "autel-robotics": "Autel Robotics",
    yuneec: "Yuneec",
    "3dr": "3DR",
    hubsan: "Hubsan",
    jjrc: "JJRC",
    "holy-stone": "Holy Stone",
    potensic: "Potensic",
    contixo: "Contixo",
    "ryze-tech": "Ryze Tech",
    powervision: "PowerVision",
    snaptain: "Snaptain",
    force1: "Force1",
    "udi-rc": "UDI RC",
    syma: "Syma",
    eachine: "EACHINE",
    "altair-aerial": "Altair Aerial",
    gopro: "GoPro",
    zerotech: "ZeroTech",
    walkera: "Walkera",
    xiaomi: "Xiaomi",
    skydio: "Skydio",
    uvify: "UVify",
    draganfly: "Draganfly",
    "aee-technology": "AEE Technology",
    hglrc: "HGLRC",
    flyability: "Flyability",
  };
  const brands: string[] = Object.keys(brandsMap);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = brands.filter((br) =>
    brandsMap[br].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Input
        type="text"
        placeholder="Search brand..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-4 border border-gray-300 rounded"
      />

      <div className="flex flex-wrap gap-4">
        {filteredBrands &&
          filteredBrands.map((br) => (
            <Link href={`/brands/${br}`} key={br}>
              <motion.div
                whileHover={{ scale: [null, 1.5, 1.4] }}
                transition={{ duration: 0.4 }}
                className="px-6 py-1 text-5xl text-white rounded-t-lg cursor-pointer bg-slate-400 hover:bg-slate-600"
              >
                {brandsMap[br]}
              </motion.div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default brands;
