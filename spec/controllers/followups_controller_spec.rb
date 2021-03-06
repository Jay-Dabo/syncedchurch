require 'rails_helper'

RSpec.describe FollowupsController, type: :controller, permission: "followups" do

  describe "POST #create" do

    it "creates a new follow up" do
      expect { post :create, params: { followup: build(:followup).attributes.merge({place: "home", reason: "friendly"}) }}.to change { Followup.count }.by(1)
    end

  end

  describe "DELETE #destroy" do

    it "deletes a record" do
      followup = create(:followup)
      expect { delete :destroy, params: { id: followup.id }}.to change { Followup.count }.by(-1)
    end

  end

end
