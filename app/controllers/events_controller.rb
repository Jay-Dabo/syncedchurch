class EventsController < ApplicationController
  load_and_authorize

  def index
    @table = Table.new(self, Event, @events)
    @table.respond
  end

  def show
  end

  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)
    @event.recurrence_attributes = recurrence_params
    if @event.save
      redirect_to event_path(@event), success: t("events.new.success")
    else
      render 'new'
    end
  end

  def edit
  end

  def update
    if @event.update_attributes(event_params)
      redirect_to edit_event_path(@event), success: t("events.edit.success")
    else
      render 'new'
    end
  end

  def destroy
    @event.destroy
    redirect_to events_path
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :dtstart, :dtend, :location, :url)
  end

  def recurrence_params
    params.require(:event).require(:recurrence).permit(:frequence, :monthly, :until, :count)
  end
end
