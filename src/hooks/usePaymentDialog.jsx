import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const usePaymentDialog = ({ onPay }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");
  const [selectedSalary, setSelectedSalary] = useState(null);

  const openDialog = (salaryData) => {
    setSelectedSalary(salaryData);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setPaymentMethod("");
    setPaymentNotes("");
    setSelectedSalary(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onPay({
      salary: selectedSalary,
      paymentMethod,
      paymentNotes,
    });

    closeDialog();
  };

  const PaymentDialog = () => (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeDialog();
      }}
    >
      {" "}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Process Payment</DialogTitle>
          <DialogDescription>
            Process salary payment for the selected worker.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 bg-[#F8FAFC] rounded-lg space-y-2">
            <h4 className="font-medium text-[#1E293B]">
              {selectedSalary?.worker?.fullName}
            </h4>
            <p className="text-base text-[#475569] font-semibold">
              ₹{selectedSalary?.monthData?.totalEarnings}
            </p>
          </div>

          <div>
            <Label>Payment Method</Label>
            <Select
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="cheque">Cheque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Payment Notes</Label>
            <Textarea
              value={paymentNotes}
              onChange={(e) => setPaymentNotes(e.target.value)}
              placeholder="Add any notes about this payment..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button type="submit">Pay</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  return { openDialog, PaymentDialog };
};
