
describe Thermostat do
  it 'has content on home page' do
    visit '/'
    expect(page).to have_content('Thermostat')
  end
end
