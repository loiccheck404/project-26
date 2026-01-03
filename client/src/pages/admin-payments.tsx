import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  ArrowLeft, 
  Plus, 
  Pencil, 
  Trash2, 
  GripVertical,
  CreditCard,
  Smartphone,
  Building2,
  Bitcoin,
  Coins,
  DollarSign,
  Save,
  X,
  Loader2,
  Shield,
} from "lucide-react";
import { SiApple } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { PaymentMethod } from "@shared/schema";

const iconMap: Record<string, any> = {
  "credit-card": CreditCard,
  "smartphone": Smartphone,
  "building-2": Building2,
  "apple": SiApple,
  "bitcoin": Bitcoin,
  "coins": Coins,
  "dollar-sign": DollarSign,
};

const iconOptions = [
  { value: "credit-card", label: "Credit Card" },
  { value: "smartphone", label: "Smartphone" },
  { value: "building-2", label: "Bank" },
  { value: "apple", label: "Apple" },
  { value: "bitcoin", label: "Bitcoin" },
  { value: "coins", label: "Coins" },
  { value: "dollar-sign", label: "Dollar" },
];

const typeOptions = [
  { value: "card", label: "Card (Stripe)" },
  { value: "manual", label: "Manual Payment" },
  { value: "external", label: "External Service" },
  { value: "crypto", label: "Cryptocurrency" },
];

function getIconComponent(iconName?: string | null) {
  if (!iconName) return CreditCard;
  return iconMap[iconName] || CreditCard;
}

interface PaymentMethodFormData {
  name: string;
  type: string;
  description: string;
  instructions: string;
  icon: string;
  providerKey: string;
  feeNote: string;
  sortOrder: number;
  enabled: boolean;
}

const defaultFormData: PaymentMethodFormData = {
  name: "",
  type: "manual",
  description: "",
  instructions: "",
  icon: "credit-card",
  providerKey: "",
  feeNote: "",
  sortOrder: 0,
  enabled: true,
};

export default function AdminPaymentsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<PaymentMethodFormData>(defaultFormData);

  const { data: isAdmin, isLoading: adminLoading } = useQuery<{ isAdmin: boolean }>({
    queryKey: ["/api/admin/check"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: paymentMethods = [], isLoading: methodsLoading } = useQuery<PaymentMethod[]>({
    queryKey: ["/api/admin/payment-methods"],
    enabled: isAuthenticated && !!isAdmin,
  });

  const createMutation = useMutation({
    mutationFn: async (data: PaymentMethodFormData) => {
      const response = await apiRequest("POST", "/api/admin/payment-methods", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/payment-methods"] });
      queryClient.invalidateQueries({ queryKey: ["/api/payment-methods"] });
      setIsDialogOpen(false);
      setFormData(defaultFormData);
      toast({ title: "Payment method created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create payment method", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PaymentMethodFormData> }) => {
      const response = await apiRequest("PATCH", `/api/admin/payment-methods/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/payment-methods"] });
      queryClient.invalidateQueries({ queryKey: ["/api/payment-methods"] });
      setIsDialogOpen(false);
      setEditingMethod(null);
      setFormData(defaultFormData);
      toast({ title: "Payment method updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update payment method", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/payment-methods/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/payment-methods"] });
      queryClient.invalidateQueries({ queryKey: ["/api/payment-methods"] });
      toast({ title: "Payment method deleted" });
    },
    onError: () => {
      toast({ title: "Failed to delete payment method", variant: "destructive" });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, enabled }: { id: string; enabled: boolean }) => {
      const response = await apiRequest("PATCH", `/api/admin/payment-methods/${id}`, { enabled });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/payment-methods"] });
      queryClient.invalidateQueries({ queryKey: ["/api/payment-methods"] });
    },
    onError: () => {
      toast({ title: "Failed to update payment method", variant: "destructive" });
    },
  });

  const handleEditClick = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormData({
      name: method.name,
      type: method.type,
      description: method.description || "",
      instructions: method.instructions || "",
      icon: method.icon || "credit-card",
      providerKey: method.providerKey || "",
      feeNote: method.feeNote || "",
      sortOrder: method.sortOrder,
      enabled: method.enabled,
    });
    setIsDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditingMethod(null);
    setFormData({
      ...defaultFormData,
      sortOrder: paymentMethods.length + 1,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingMethod) {
      updateMutation.mutate({ id: editingMethod.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (authLoading || adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center lg:px-8">
        <Shield className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold">Authentication Required</h1>
        <p className="mt-2 text-muted-foreground">
          Please log in to access the admin panel.
        </p>
        <Button className="mt-6 bg-gold text-black" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center lg:px-8">
        <Shield className="mx-auto h-16 w-16 text-red-400 mb-4" />
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="mt-2 text-muted-foreground">
          You don't have permission to access this page.
        </p>
        <Button className="mt-6 bg-gold text-black" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      <Button variant="ghost" className="mb-6" asChild data-testid="button-back">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Store
        </Link>
      </Button>

      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Payment Settings</h1>
          <p className="text-muted-foreground mt-1">Manage which payment methods are available at checkout</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddClick} className="bg-gold text-black" data-testid="button-add-payment">
              <Plus className="mr-2 h-4 w-4" />
              Add Method
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingMethod ? "Edit Payment Method" : "Add Payment Method"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Credit Card"
                  data-testid="input-method-name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger data-testid="select-method-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Select
                    value={formData.icon}
                    onValueChange={(value) => setFormData({ ...formData, icon: value })}
                  >
                    <SelectTrigger data-testid="select-method-icon">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="providerKey">Provider Key</Label>
                <Input
                  id="providerKey"
                  value={formData.providerKey}
                  onChange={(e) => setFormData({ ...formData, providerKey: e.target.value })}
                  placeholder="stripe, cashapp, zelle, etc."
                  data-testid="input-provider-key"
                />
                <p className="text-xs text-muted-foreground">Used internally to identify the payment processor</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Pay securely with your card"
                  data-testid="input-description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instructions">Payment Instructions</Label>
                <Textarea
                  id="instructions"
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  placeholder="Instructions shown to customers after placing order..."
                  rows={4}
                  data-testid="input-instructions"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="feeNote">Fee Note (optional)</Label>
                <Input
                  id="feeNote"
                  value={formData.feeNote}
                  onChange={(e) => setFormData({ ...formData, feeNote: e.target.value })}
                  placeholder="e.g., 3% processing fee"
                  data-testid="input-fee-note"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                    data-testid="input-sort-order"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch
                    id="enabled"
                    checked={formData.enabled}
                    onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
                    data-testid="switch-form-enabled"
                  />
                  <Label htmlFor="enabled">Enabled</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel">
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="bg-gold text-black"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-method"
                >
                  {(createMutation.isPending || updateMutation.isPending) ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {methodsLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : paymentMethods.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <CreditCard className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No payment methods configured yet.</p>
            <Button onClick={handleAddClick} className="mt-4 bg-gold text-black" data-testid="button-add-first-payment">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Payment Method
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {paymentMethods
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((method) => {
              const IconComponent = getIconComponent(method.icon);
              return (
                <Card key={method.id} className={!method.enabled ? "opacity-60" : ""} data-testid={`card-payment-${method.providerKey}`}>
                  <CardContent className="flex items-center gap-4 py-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{method.name}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {method.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{method.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={method.enabled}
                        onCheckedChange={(checked) => toggleMutation.mutate({ id: method.id, enabled: checked })}
                        data-testid={`switch-enable-${method.providerKey}`}
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEditClick(method)}
                        data-testid={`button-edit-${method.providerKey}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon" variant="ghost" data-testid={`button-delete-${method.providerKey}`}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Payment Method</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{method.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(method.id)}
                              className="bg-red-600 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      )}

      <Card className="mt-8 bg-muted/30">
        <CardHeader>
          <CardTitle className="text-base">Admin Access</CardTitle>
          <CardDescription>
            Admin access is controlled by the ADMIN_USER_IDS environment variable. Your current user ID is: <code className="text-xs bg-muted px-1 py-0.5 rounded">{user?.id}</code>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
