using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.DataAccessLayer;
using ZuciQuizLibrary.DataAccessLayer.Interfaces;
using ZuciQuizLibrary.Models;
using ZuciQuizLibrary.Services.Interfaces;

namespace ZuciQuizLibrary.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<List<Role>> GetAllRole()
        {
            var roles = await _roleRepository.GetAllRole();
            return (roles);
        }

        public async Task<Role> GetRoleNameById(int roleId)
        {
            try
            {
                var rolename = await _roleRepository.GetRoleNameById(roleId);
                return rolename;
            }
            catch(Exception)
            {
                throw new Exception("Error occured in RoleName");
            } 
           
        }
       
    }
}
