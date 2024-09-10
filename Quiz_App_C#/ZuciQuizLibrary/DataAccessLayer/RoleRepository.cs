using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.DataAccessLayer.Interfaces;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.DataAccessLayer
{
    public class RoleRepository : IRoleRepository
    {
        readonly ContextDb contextDb = new ContextDb();

        public async Task<List<Role>> GetAllRole()
        {
            List<Role> roles = await contextDb.Roles.ToListAsync();
            return roles;
        }

        public async Task<Role> GetRoleNameById(int roleId)
        {  
            Role role=await(from roleName in contextDb.Roles where roleName.Id==roleId select roleName).FirstAsync();
            return role;
        }
    }
}
