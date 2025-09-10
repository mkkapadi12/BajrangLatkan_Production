import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Workerfilters = ({
  name,
  setName,
  village,
  setVillage,
  gender,
  setGender,
  phone,
  setPhone,
  status,
  setStatus,
  statusItem,
}) => {
  return (
    <Card className="py-3 border-l-4 shadow-lg border-bajrang-brand">
      <CardContent className="grid gap-4 md:p-6 sm:grid-cols-5">
        <Input
          placeholder="Search by Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-l-4 border-bajrang-accent"
        />
        <Input
          placeholder="Search by Village..."
          value={village}
          onChange={(e) => setVillage(e.target.value)}
          className="border-l-4 border-bajrang-accent"
        />
        <Input
          type="number"
          placeholder="Search by Phone..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border-l-4 border-bajrang-accent"
        />
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger className="w-full border-l-4 border-bajrang-accent">
            {/* <ADMINICONS.FILTER className="w-4 h-4 mr-2" /> */}
            <SelectValue placeholder="Filter by Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full border-l-4 border-bajrang-accent">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            {statusItem?.map((item) => {
              return <SelectItem value={item.value}>{item.label}</SelectItem>;
            })}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
