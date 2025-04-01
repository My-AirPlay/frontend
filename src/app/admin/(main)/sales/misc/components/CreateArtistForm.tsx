
import React, { useState } from 'react';
import { Button, Tabs, TabsList, TabsTrigger, TabsContent, FileUploader, Input, SelectSimple, SingleDatePicker } from '@/components/ui';

interface CreateArtistFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (artistData: any) => void;
}

const CreateArtistForm: React.FC<CreateArtistFormProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState('overview');
  console.log(activeTab)
  const [artistData, setArtistData] = useState({
    name: '',
    alternativeName: '',
    bankName: '',
    bankAddress: '',
    currency: 'Home Currency',
    paymentEmail: '',
    paymentCurrency: 'NGN',
    generateAutoPayment: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setArtistData({ ...artistData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setArtistData({ ...artistData, [name]: checked });
  };

  const handleSaveAndContinue = () => {
    onSave(artistData);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Create Artist</h1>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="bg-transparent border-b border-border w-full justify-start mb-6">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="contract"
            className="data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4"
          >
            Contract
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Input
              label="Name"
              type="text"
              name="name"
              value={artistData.name}
              onChange={handleInputChange}
              className="w-full "
              placeholder="Enter Name"
            />


            <Input
              label="Bank Name"
              type="text"
              name="bankName"
              value={artistData.bankName}
              onChange={handleInputChange}
              className="w-full "
              placeholder="Enter name"
            />

            <Input
              label="Alternative Name"
              type="text"
              name="alternativeName"
              value={artistData.alternativeName}
              onChange={handleInputChange}
              className="w-full "
              placeholder="Enter Name"
            />


            <Input
              label="Bank Address"
              type="text"
              name="bankAddress"
              value={artistData.bankAddress}
              onChange={handleInputChange}
              className="w-full "
              placeholder="Enter Address"
            />

            <SelectSimple
              label="Currency"
              options={[
                { label: "Home Currency", value: "Home Currency" },
                { label: "USD", value: "USD" },
                { label: "EUR", value: "EUR" },
                { label: "GBP", value: "GBP" },
              ]}
              valueKey="value"
              labelKey="label"
              onChange={(new_value) => setArtistData({ ...artistData, currency: new_value })}
            />


            <div className="space-y-2">
              <label className="block text-sm">Auto Payment</label>
              <div className="bg-custom-gradient border border-border rounded-md p-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="generateAutoPayment"
                    checked={artistData.generateAutoPayment}
                    onChange={handleCheckboxChange}
                    className="mt-1"
                  />
                  <div>
                    <label className="font-medium">Generate Auto Payment</label>
                    <p className="text-sm text-white/60 mt-1">
                      Use the payments below to configure when an auto payment should take place, this should be for instance when producers or a third party should only be paid when other contract is recouped
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Input
              label="Payment Email"
              type="email"
              name="paymentEmail"
              value={artistData.paymentEmail}
              onChange={handleInputChange}
              className="w-full "
              placeholder="Enter email for payment"
            />


            <SelectSimple
              label="Payment Currency"
              options={[
                { label: "NGN", value: "NGN" },
                { label: "USD", value: "USD" },
                { label: "EUR", value: "EUR" },
                { label: "GBP", value: "GBP" },
              ]}
              valueKey="value"
              labelKey="label"
              onChange={(new_value) => setArtistData({ ...artistData, paymentCurrency: new_value })}
            />
           
          </div>
        </TabsContent>

        <TabsContent value="contract" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SingleDatePicker
              label='Start Date'
              value={new Date()}
            />
            <SingleDatePicker
              label='End Date'
              value={new Date()}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2">Upload Artist Contract</label>
            <FileUploader
              supportedFormats={['PDF', 'MSDOC']}
              maxFileSize={40}
              onFileSelected={(file) => console.log('File selected:', file)}
              id="artist-contract"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button
          className="bg-primary hover:bg-primary/90 text-white px-8"
          onClick={handleSaveAndContinue}
        >
          Save and Continue
        </Button>
      </div>
    </div>
  );
};

export default CreateArtistForm;
