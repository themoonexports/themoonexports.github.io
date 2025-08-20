#!/bin/bash

# Environment Setup Script for The Moon Exports
# This script helps developers set up their local environment safely

set -e

echo "🚀 Setting up The Moon Exports development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if .env already exists
if [ -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file already exists${NC}"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}ℹ️  Keeping existing .env file${NC}"
        exit 0
    fi
fi

# Copy template to .env
echo -e "${BLUE}📋 Creating .env file from template...${NC}"
cp .env.template .env

# Function to update environment variable
update_env_var() {
    local var_name=$1
    local var_description=$2
    local var_default=$3
    local is_secret=$4
    
    if [ "$is_secret" = true ]; then
        echo -e "${RED}🔐 ${var_description}${NC}"
        echo -e "${YELLOW}   Leave empty if you don't have this yet${NC}"
        read -p "   Enter value: " -s var_value
        echo
    else
        echo -e "${GREEN}📝 ${var_description}${NC}"
        if [ ! -z "$var_default" ]; then
            echo -e "${BLUE}   Default: ${var_default}${NC}"
            read -p "   Enter value (press Enter for default): " var_value
            if [ -z "$var_value" ]; then
                var_value=$var_default
            fi
        else
            read -p "   Enter value: " var_value
        fi
    fi
    
    if [ ! -z "$var_value" ]; then
        # Escape special characters for sed
        escaped_value=$(echo "$var_value" | sed 's/[[\.*^$()+?{|]/\\&/g')
        sed -i.bak "s/^${var_name}=.*/${var_name}=${escaped_value}/" .env
        rm .env.bak
        echo -e "${GREEN}   ✅ ${var_name} set${NC}"
    else
        echo -e "${YELLOW}   ⏭️  ${var_name} skipped${NC}"
    fi
    echo
}

echo -e "${BLUE}🔧 Let's configure your environment variables...${NC}"
echo

# Environment setting
echo -e "${GREEN}📍 Environment Configuration${NC}"
update_env_var "NODE_ENV" "Environment (development/production)" "development" false
update_env_var "SITE_URL" "Local development URL" "http://localhost:8000" false
echo

# Google Services
echo -e "${GREEN}🔍 Google Services (Optional for development)${NC}"
update_env_var "GOOGLE_ANALYTICS_ID" "Google Analytics Tracking ID" "" true
update_env_var "GOOGLE_SEARCH_CONSOLE_TOKEN" "Google Search Console Token" "" true
echo

# Company Information
echo -e "${GREEN}🏢 Company Information${NC}"
update_env_var "COMPANY_NAME" "Company Name" "The Moon Exports" false
update_env_var "COMPANY_EMAIL" "Company Email" "info@themoonexports.com" false
update_env_var "COMPANY_PHONE" "Company Phone" "+91 8909070131" false
echo

# Email Configuration (if needed)
echo -e "${GREEN}📧 Email Configuration (Optional)${NC}"
echo -e "${YELLOW}   Only needed if you plan to test contact forms locally${NC}"
update_env_var "SMTP_HOST" "SMTP Host" "" true
update_env_var "SMTP_USER" "SMTP Username" "" true
update_env_var "SMTP_PASSWORD" "SMTP Password" "" true
echo

# Social Media
echo -e "${GREEN}📱 Social Media URLs${NC}"
update_env_var "SOCIAL_FACEBOOK" "Facebook URL" "https://www.facebook.com/themoonexports" false
update_env_var "SOCIAL_INSTAGRAM" "Instagram URL" "https://www.instagram.com/themoonexports" false
update_env_var "SOCIAL_LINKEDIN" "LinkedIn URL" "https://www.linkedin.com/company/themoonexports" false
echo

# Development settings
echo -e "${GREEN}⚙️  Development Settings${NC}"
update_env_var "DEBUG_MODE" "Enable debug mode (true/false)" "true" false
update_env_var "MINIFY_CSS" "Minify CSS (true/false)" "false" false
update_env_var "MINIFY_JS" "Minify JavaScript (true/false)" "false" false
echo

echo -e "${GREEN}✅ Environment setup complete!${NC}"
echo
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "   1. Review your .env file and adjust values as needed"
echo -e "   2. Never commit your .env file to version control"
echo -e "   3. See docs/ENVIRONMENT_CONFIGURATION.md for more details"
echo
echo -e "${YELLOW}🔐 Security reminders:${NC}"
echo -e "   • Use development/test API keys only in your .env file"
echo -e "   • Store production secrets in your hosting platform"
echo -e "   • Regularly rotate API keys and tokens"
echo
echo -e "${GREEN}🎉 Happy coding!${NC}"